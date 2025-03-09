package main

import (
	"github.com/rs/zerolog/log"
	"tmail/internal"
)

func main() {
	err := internal.NewApp().Run()
	if err != nil {
		log.Panic().Err(err).Send()
	}
}
