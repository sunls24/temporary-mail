package pubsub

import (
	"sync"
	"tmail/ent"
)

var (
	index       int
	m           sync.RWMutex
	subscribers = map[string]map[int]chan *ent.Envelope{}
)

func Subscribe(to string) (<-chan *ent.Envelope, func()) {
	ch := make(chan *ent.Envelope, 1)
	m.Lock()
	defer m.Unlock()
	id := index
	index++

	if _, ok := subscribers[to]; !ok {
		subscribers[to] = map[int]chan *ent.Envelope{}
	}
	subscribers[to][id] = ch

	return ch, func() {
		m.Lock()
		defer m.Unlock()
		delete(subscribers[to], id)
		if len(subscribers[to]) == 0 {
			delete(subscribers, to)
		}
		close(ch)
	}
}

func Publish(e *ent.Envelope) {
	if len(subscribers) == 0 || len(subscribers[e.To]) == 0 {
		return
	}
	m.RLock()
	defer m.RUnlock()
	for _, sub := range subscribers[e.To] {
		sub <- e
	}
}
