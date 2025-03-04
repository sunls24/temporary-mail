package api

import (
	"github.com/jhillyerd/enmime"
	"tmail/internal/pubsub"
)

func Report(ctx *Context) error {
	to := ctx.QueryParam("to")
	if to == "" {
		return nil
	}
	envelope, err := enmime.ReadEnvelope(ctx.Request().Body)
	if err != nil {
		return err
	}
	subject := envelope.GetHeader("subject")
	from := envelope.GetHeader("from")
	content := envelope.HTML
	if content == "" {
		content = envelope.Text
	}
	e, err := ctx.Envelope.Create().
		SetTo(to).
		SetFrom(from).
		SetSubject(subject).
		SetContent(content).
		Save(ctx.Request().Context())
	if err == nil {
		e.Content = ""
		go pubsub.Publish(e)
	}
	return err
}
