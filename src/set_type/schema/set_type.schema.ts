import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Seat } from "src/seat/schemas/seat.schema";

export type SetTypeDocument = HydratedDocument<SetType>;

@Schema({ versionKey: false, timestamps: false })
export class SetType {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Set_type"
      }
    ]
  })
  seat: Seat[];
}

export const SetTypeSchema = SchemaFactory.createForClass(SetType);
