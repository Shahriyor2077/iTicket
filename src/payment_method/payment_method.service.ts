import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePaymentMethodDto } from "./dto/create-payment_method.dto";
import { PaymentMethod } from "./schemas/payment_method.schema";
import { UpdatePaymentMethodDto } from "./dto/update-payment_method.dto";

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name) private readonly paymentMethodSchema: Model<PaymentMethod>
  ) {}
  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const exist = await this.paymentMethodSchema.findOne({
      name: createPaymentMethodDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday paymentMethod allaqachon mavjud");
    }
    return this.paymentMethodSchema.create(createPaymentMethodDto);
  }

  findAll() {
    return this.paymentMethodSchema.find();
  }

  async findOne(id: string) {
    const paymentMethod = await this.paymentMethodSchema.findOne({ _id: id });
    if (!paymentMethod) {
      throw new NotFoundException("Bunday id lik paymentMethod topilmadi");
    }
    return paymentMethod;
  }

  update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodSchema.findByIdAndUpdate(id, updatePaymentMethodDto);
  }

  async remove(id: string) {
    return this.paymentMethodSchema.findByIdAndDelete(id);
  }
}
