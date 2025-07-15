import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerSchema: Model<Customer>
  ){}
  async create(createCustomerDto: CreateCustomerDto) {
    const {password, confirm_password}=createCustomerDto
    if(password!==confirm_password){
      throw new BadRequestException("Parollar mos emas")
    }
    const hashed_password=await bcrypt.hash(password, 7)
    return this.customerSchema.create({...createCustomerDto, hashed_password})
  }

  findAll() {
    return this.customerSchema.find();
  }

  findOne(id: string) {
    return this.customerSchema.findById(id);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerSchema.findByIdAndUpdate(id, updateCustomerDto, {new: true});
  }

  remove(id: string) {
    return this.customerSchema.findByIdAndDelete(id);
  }
}
