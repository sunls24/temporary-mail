package api

import (
	"net/http"
	"strconv"
	"time"
	"tmail/ent"
	"tmail/ent/envelope"
	"tmail/internal/pubsub"
)

func Fetch(ctx *Context) error {
	to := ctx.QueryParam("to")
	if to == "" {
		return ctx.Bad("not found to address")
	}
	list, err := ctx.Envelope.Query().
		Select(envelope.FieldID, envelope.FieldTo, envelope.FieldFrom, envelope.FieldSubject, envelope.FieldCreatedAt).
		Where(envelope.To(to)).
		Order(ent.Desc(envelope.FieldID)).
		All(ctx.Request().Context())
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, list)
}

func FetchDetail(ctx *Context) error {
	idStr := ctx.Param("id")
	if idStr == "" {
		return ctx.Bad("not found id param")
	}
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return ctx.Bad("invalid id param: " + idStr)
	}
	one, err := ctx.Envelope.Query().
		Select(envelope.FieldContent).
		Where(envelope.ID(id)).
		Only(ctx.Request().Context())
	if ent.IsNotFound(err) {
		return ctx.Badf("envelope %d not found", id)
	}
	if err != nil {
		return err
	}

	return ctx.String(http.StatusOK, one.Content)
}

func FetchLatest(ctx *Context) error {
	to := ctx.QueryParam("to")
	if to == "" {
		return ctx.Bad("not found to address")
	}
	idStr := ctx.QueryParam("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return ctx.Bad("invalid id param: " + idStr)
	}
	one, err := ctx.Envelope.Query().
		Select(envelope.FieldID, envelope.FieldTo, envelope.FieldFrom, envelope.FieldSubject, envelope.FieldCreatedAt).
		Where(envelope.IDGT(id), envelope.To(to)).
		Order(ent.Asc(envelope.FieldID)).
		First(ctx.Request().Context())
	if err == nil {
		return ctx.JSON(http.StatusOK, one)
	}
	if !ent.IsNotFound(err) {
		return err
	}

	ch, cancel := pubsub.Subscribe(to)
	defer cancel()
	select {
	case e := <-ch:
		return ctx.JSON(http.StatusOK, e)
	case <-time.After(time.Minute):
		return ctx.NoContent(http.StatusNoContent)
	case <-ctx.Request().Context().Done():
		return nil
	}
}
