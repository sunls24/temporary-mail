package api

import "net/http"

func DomainList(ctx *Context) error {
	return ctx.JSON(http.StatusOK, ctx.DomainList)
}
