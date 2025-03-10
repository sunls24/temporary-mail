package config

import (
	"github.com/caarlos0/env/v11"
)

type Config struct {
	Host         string   `env:"HOST"`
	Port         string   `env:"PORT" envDefault:"3000"`
	DomainList   []string `env:"DOMAIN_LIST"`
	AdminAddress string   `env:"ADMIN_ADDRESS"`
	DB           Database `envPrefix:"DB_"`
}

type Database struct {
	Driver string `env:"DRIVER" envDefault:"postgres"`
	Host   string `env:"HOST"`
	Port   string `env:"PORT" envDefault:"5432"`
	User   string `env:"USER" envDefault:"postgres"`
	Pass   string `env:"PASS"`
	Name   string `env:"NAME" envDefault:"tmail"`
}

func MustNew() *Config {
	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		panic(err)
	}
	return &cfg
}
