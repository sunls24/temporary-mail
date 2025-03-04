package api

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"tmail/config"
	"tmail/ent"
)

type Context struct {
	echo.Context
	*ent.Client
	*config.Config
}

func Middleware(client *ent.Client, cfg *config.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			return next(&Context{c, client, cfg})
		}
	}
}

func Wrap(fn func(*Context) error) echo.HandlerFunc {
	return func(c echo.Context) error {
		return fn(c.(*Context))
	}
}

func (c *Context) Bad(msg string) error {
	return echo.NewHTTPError(http.StatusBadRequest, msg)
}

//goland:noinspection SpellCheckingInspection
func (c *Context) Badf(f string, args ...any) error {
	return c.Bad(fmt.Sprintf(f, args...))
}
