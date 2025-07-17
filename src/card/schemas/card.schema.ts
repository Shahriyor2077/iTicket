import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "../../customer/schemas/customer.schema";

export type CardDocument=HydratedDocument<Card>
@Schema({versionKey: false, timestamps: true})

export class Card {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    })
    customer_id: Customer

    @Prop()
    created_at: Date
    @Prop()
    finished_at: Date
    @Prop()
    status_id: number
}

export const CardSchema=SchemaFactory.createForClass(Card)