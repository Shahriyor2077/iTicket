import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { TicketStatus } from "../../ticket_status/schemas/ticket_status.schema";
import { Seat } from "../../seat/schemas/seat.schema";

export type TicketDocument=HydratedDocument<Ticket>
@Schema({versionKey: false, timestamps: false})

export class Ticket {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "TicketStatus",
    })
    ticket_status_id: TicketStatus;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
    })
    seat_id: Seat

    @Prop()
    price: number

    @Prop()
    service_fee: string

    // @Prop({
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"Status"
    // })
    // status_id: status

    @Prop()
    ticket_type: number
}

export const TicketSchema=SchemaFactory.createForClass(Ticket)
