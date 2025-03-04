package route

import (
	"github.com/labstack/echo/v4"
	"tmail/internal/api"
)

func Register(e *echo.Echo) {
	g := e.Group("/api")
	g.POST("/report", api.Wrap(api.Report))
	g.GET("/fetch", api.Wrap(api.Fetch))
	g.GET("/fetch/:id", api.Wrap(api.FetchDetail))
	g.GET("/fetch/latest", api.Wrap(api.FetchLatest))
	g.GET("/domain", api.Wrap(api.DomainList))
}
