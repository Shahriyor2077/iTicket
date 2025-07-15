import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "../../customer/schemas/customer.schema";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;
@Schema({ versionKey: false, timestamps: true })
export class CustomerAddress {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  })
  customer_id: Customer;

  @Prop()
  region_id: number;

  @Prop()
  district_id: number;

  @Prop()
  name: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: number;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;
}

  

export const CustomerAddressSchema = SchemaFactory.createForClass(CustomerAddress);
