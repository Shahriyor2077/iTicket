import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VenueType } from "src/venue_types/schemas/venue_type.schema";

export type TypeDocument = HydratedDocument<Type>;

@Schema({ versionKey: false, timestamps: false })
export class Type {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue_types",
      },
    ],
  })
  venue_type: VenueType[];
}

export const TypeSchema = SchemaFactory.createForClass(Type);
