
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";
import { Event } from "src/event/schemas/event.schema";

export type EventTypeDocument = HydratedDocument<EventType>;

@Schema({ versionKey: false, timestamps: false })
export class EventType {
  @Prop({ required: true })
  name: string;

  @Prop()
  parent_event_type_id: number

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  })
  events: Event[];
}

export const EventTypeSchema = SchemaFactory.createForClass(EventType);



