package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"entgo.io/ent/schema/index"
	"time"
)

// Envelope holds the schema definition for the Envelope entity.
type Envelope struct {
	ent.Schema
}

// Fields of the Envelope.
func (Envelope) Fields() []ent.Field {
	return []ent.Field{
		field.String("to").NotEmpty(),
		field.String("from").NotEmpty(),
		field.String("subject").NotEmpty(),
		field.String("content").NotEmpty(),
		field.Time("created_at").Default(time.Now),
	}
}

func (Envelope) Indexes() []ent.Index {
	return []ent.Index{
		index.Fields("to"),
	}
}

// Edges of the Envelope.
func (Envelope) Edges() []ent.Edge {
	return nil
}
