import { Injectable } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerAddress } from './schemas/customer_address.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name) private readonly customerAddressSchema: Model<CustomerAddress>
  ){}
  create(createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressSchema.create(createCustomerAddressDto);
  }

  findAll() {
    return this.customerAddressSchema
      .find()
      .populate({ path: "customer_id", select: "first_name, last_name" });
  }

  findOne(id: string) {
    return this.customerAddressSchema
      .findById(id)
      .populate({ path: "customer_id", select: "first_name, last_name" });
  }

  update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    return this.customerAddressSchema.findByIdAndUpdate(id, updateCustomerAddressDto, {new: true});
  }

  remove(id: string) {
    return this.customerAddressSchema.findByIdAndDelete(id);
  }
}
