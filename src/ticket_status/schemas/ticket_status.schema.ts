import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ref } from "process";
import { Ticket } from "../../ticket/schemas/ticket.schema";

export type TicketStatusDocument = HydratedDocument<TicketStatus>;

@Schema({ versionKey: false, timestamps: false })
export class TicketStatus {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  })
  ticket: Ticket[];
}

export const TicketStatusSchema = SchemaFactory.createForClass(TicketStatus);
