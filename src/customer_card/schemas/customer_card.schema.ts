import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "src/customer/schemas/customer.schema";

export type CustomerCardDocument=HydratedDocument<CustomerCard>
@Schema({ versionKey: false, timestamps: true })
export class CustomerCard {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  })
  customer_id: Customer;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  number: string;

  @Prop()
  year: string;

  @Prop()
  month: string;

  @Prop()
  is_active: boolean;

  @Prop()
  is_main: boolean;
}

export const CustomerCardSchema=SchemaFactory.createForClass(CustomerCard)