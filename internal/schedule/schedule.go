package schedule

import (
	"context"
	"fmt"
	"github.com/rs/zerolog/log"
	"time"
	"tmail/ent"
	"tmail/ent/envelope"
)

type Scheduler struct {
	db *ent.Client
}

func New(db *ent.Client) *Scheduler {
	return &Scheduler{db: db}
}

func (s *Scheduler) Run() {
	go s.cleanUpExpired()
}

func (s *Scheduler) cleanUpExpired() {
	run(func() {
		expired := time.Now().Add(-time.Hour * 240)
		count, err := s.db.Envelope.Delete().Where(envelope.CreatedAtLT(expired)).Exec(context.TODO())
		if err != nil {
			log.Err(err).Send()
			return
		}
		if count > 0 {
			log.Info().Msgf("clean up expired %d", count)
		}
	}, time.Hour)
}

func run(fn func(), dur time.Duration) {
	for {
		select {
		case <-time.Tick(dur):
			go func() {
				defer func() {
					if err := recover(); err != nil {
						log.Error().Msg(fmt.Sprint(err))
					}
				}()
				fn()
			}()
		}
	}
}
