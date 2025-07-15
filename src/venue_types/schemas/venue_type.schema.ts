import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Type } from "src/type/schemas/type.schema";
import { Venue } from "src/venue/schemas/venue.schema";

export type VenueTypeDocument = HydratedDocument<VenueType>;
@Schema({ versionKey: false, timestamps: false })
export class VenueType {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  })
  venue_id: Venue;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
  })
  type_id: Type;
}

export const VenueTypeSchema = SchemaFactory.createForClass(VenueType);
