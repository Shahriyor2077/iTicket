import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { SetType } from "src/set_type/schema/set_type.schema";
import { Venue } from "src/venue/schemas/venue.schema";

export type SeatDocument = HydratedDocument<Seat>;

@Schema({ versionKey: false, timestamps: false })
export class Seat {
  @Prop()
  sector: number;

  @Prop()
  row_number: number;

  @Prop()
  number: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "SetType",
  })
  set_type_id: SetType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue"
  })
  venue_id: Venue

  @Prop()
  location_type_schema: string
}

export const SeatSchema=SchemaFactory.createForClass(Seat)