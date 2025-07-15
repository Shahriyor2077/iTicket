import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerCard } from './schemas/customer_card.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Customer } from 'src/customer/schemas/customer.schema';

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private readonly customerCardSchema: Model<CustomerCard>,
    @InjectModel(Customer.name) private customerService: Model<Customer>
  ) {}
  create(createCustomerCardDto: CreateCustomerCardDto) {
    const { customer_id } = createCustomerCardDto;
    if (!isValidObjectId(customer_id)) {
      throw new BadRequestException("Customer ID noto'g'ri");
    }
    const customer = this.customerService.findById(customer_id);
    if (!customer) {
      throw new BadRequestException("Bunday Customer yoq");
    }

    return this.customerCardSchema.create(createCustomerCardDto);
  }

  findAll() {
    return this.customerCardSchema
      .find()
      .populate({ path: "customer_id", select: "first_name, last_name" });
  }

  findOne(id: string) {
    return this.customerCardSchema
      .findById(id)
      .populate({ path: "customer_id", select: "first_name, last_name" });
  }

  update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    return this.customerCardSchema.findByIdAndUpdate(
      id,
      updateCustomerCardDto,
      { new: true }
    );
  }

  remove(id: string) {
    return this.customerCardSchema.findByIdAndDelete(id);
  }
}
