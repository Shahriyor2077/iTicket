import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Ticket } from "../../ticket/schemas/ticket.schema";
import { Card } from "../../card/schemas/card.schema";


export type CardItemDocument=HydratedDocument<CardItem>
@Schema({versionKey: false, timestamps: true})

export class CardItem {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    })
    ticket_id: Ticket

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    })
    card_id: Card
}

export const CardItemSchema=SchemaFactory.createForClass(CardItem)
