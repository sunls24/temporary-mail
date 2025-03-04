package ent

import (
	"context"
	"fmt"
	cfg "tmail/config"
)

//go:generate go run -mod=mod entgo.io/ent/cmd/ent generate ./schema

func New(db cfg.Database) (*Client, error) {
	client, err := Open(db.Driver,
		fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=disable timezone=Asia/Shanghai",
			db.Host, db.Port, db.Name, db.User, db.Pass))
	if err != nil {
		return nil, err
	}
	return client, client.Schema.Create(context.TODO())
}
