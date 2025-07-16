import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { EventType } from "src/event_type/schemas/event_type.schema";

export type EventDocument=HydratedDocument<Event>
@Schema({ versionKey: false, timestamps: false })
export class Event {
  @Prop({ required: true })
  name: string;
  @Prop()
  photo: string;
  @Prop()
  start_date: Date;
  @Prop()
  start_time: Date;
  @Prop()
  finish_date: Date;
  @Prop()
  finish_time: Date;
  @Prop()
  info: string;
  @Prop()
  event_type_id: number;
  @Prop()
  human_category_id: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventType",
  })
  parent_event_type_id: EventType;
}

export const EventSchema = SchemaFactory.createForClass(Event);
