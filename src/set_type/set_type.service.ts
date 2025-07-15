import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SetType } from "./schema/set_type.schema";
import { CreateSetTypeDto } from "./dto/create-set_type.dto";
import { UpdateSetTypeDto } from "./dto/update-set_type.dto";

@Injectable()
export class SetTypeService {
  constructor(
    @InjectModel(SetType.name) private readonly setTypeSchema: Model<SetType>
  ) {}
  async create(createSetTypeDto: CreateSetTypeDto) {
    const exist = await this.setTypeSchema.findOne({
      name: createSetTypeDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday setType allaqachon mavjud");
    }
    return this.setTypeSchema.create(createSetTypeDto);
  }

  findAll() {
    return this.setTypeSchema.find();
  }

  async findOne(id: string) {
    const setType = await this.setTypeSchema.findOne({ _id: id });
    if (!setType) {
      throw new NotFoundException("Bunday id lik setType topilmadi");
    }
    return setType;
  }

  update(id: string, updateSetTypeDto: UpdateSetTypeDto) {
    return this.setTypeSchema.findByIdAndUpdate(id, updateSetTypeDto);
  }

  async remove(id: string) {
    return this.setTypeSchema.findByIdAndDelete(id);
  }
}
