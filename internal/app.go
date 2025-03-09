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
	"tmail/internal/constant"
	"tmail/internal/route"
	"tmail/internal/schedule"
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

	schedule.New(client).Run()

	e := echo.New()
	e.Pre(i18n)
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

func i18n(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if c.Request().URL.Path != "/" {
			return next(c)
		}

		al := c.Request().Header.Get("Accept-Language")
		if al == "" {
			al = constant.DefaultLang
		}
		lang := al[:2]

		c.Request().URL.Path += lang + "/"
		return next(c)
	}
}
