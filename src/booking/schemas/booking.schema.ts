import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { PaymentMethod } from "../../payment_method/schemas/payment_method.schema";
import { DeliveryMethod } from "../../delivery_method/schemas/delivery_method.schema";

export type BookingDocument=HydratedDocument<Booking>
@Schema({versionKey: false, timestamps: false})

export class Booking {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
    })
    booking_id: Booking

    @Prop()
    created_at: Date

    @Prop()
    finished_at: Date

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod"
    })
    payment_method_id: PaymentMethod

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliverMethod"
    })
    deliver_method_id: DeliveryMethod

    @Prop()
    discount_coupon_id: number

    @Prop()
    status_id: number
}

export const BookingSchema=SchemaFactory.createForClass(Booking)