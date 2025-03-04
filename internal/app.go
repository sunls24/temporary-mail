package internal

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"os"
	"tmail/config"
	"tmail/ent"
	"tmail/internal/api"
	"tmail/internal/route"
	"tmail/web"
)

type App struct {
}

func NewApp() App {
	return App{}
}

func (App) init() {
	log.Logger = log.Logger.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: "06-01-02 15:04:05"})
}

func (app App) Run() error {
	app.init()
	cfg := config.MustNew()
	client, err := ent.New(cfg.DB)
	if err != nil {
		return err
	}
	defer client.Close()

	e := echo.New()
	e.Use(api.Middleware(client, cfg))
	e.Use(middleware.RecoverWithConfig(middleware.RecoverConfig{
		DisablePrintStack: true,
	}))
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		e.DefaultHTTPErrorHandler(err, c)
		//goland:noinspection GoTypeAssertionOnErrors
		if _, ok := err.(*echo.HTTPError); !ok {
			log.Err(err).Send()
		}
	}

	route.Register(e)
	e.StaticFS("/", echo.MustSubFS(web.FS, "dist"))
	return e.Start(fmt.Sprintf("%s:%s", cfg.Host, cfg.Port))
}
