import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDeliveryMethodDto } from "./dto/create-delivery_method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery_method.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DeliveryMethod } from "./schemas/delivery_method.schema";
import { Model } from "mongoose";

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod.name) private readonly regionSchema: Model<DeliveryMethod>
  ) {}
  async create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    const exist = await this.regionSchema.findOne({
      name: createDeliveryMethodDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday deliveryMethod allaqachon mavjud");
    }
    return this.regionSchema.create(createDeliveryMethodDto);
  }

  findAll() {
    return this.regionSchema.find();
  }

  async findOne(id: string) {
    const deliveryMethod = await this.regionSchema.findOne({ _id: id });
    if (!deliveryMethod) {
      throw new NotFoundException("Bunday id lik deliveryMethod topilmadi");
    }
    return deliveryMethod;
  }

  update(id: string,updateDeliveryMethodDto:UpdateDeliveryMethodDto) {
    return this.regionSchema.findByIdAndUpdate(id,updateDeliveryMethodDto);
  }

  async remove(id: string) {
    return this.regionSchema.findByIdAndDelete(id);
  }
}
