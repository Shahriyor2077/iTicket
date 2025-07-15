import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LanguageDocument = HydratedDocument<Language>;

@Schema({ versionKey: false, timestamps: false })
export class Language {
  @Prop({ required: true })
  name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
