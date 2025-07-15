import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Type } from "./schemas/type.schema";
import { Model } from "mongoose";

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Type.name) private readonly typeSchema: Model<Type>
  ) {}
  async create(createTypeDto: CreateTypeDto) {
    const exist = await this.typeSchema.findOne({ name: createTypeDto.name });
    if (exist) {
      throw new ConflictException("Bunday type allaqachon mavjud");
    }
    return this.typeSchema.create(createTypeDto);
  }

  findAll() {
    return this.typeSchema.find();
  }

  async findOne(id: string) {
    const type = await this.typeSchema.findOne({ _id: id });
    if (!type) {
      throw new NotFoundException("Bunday id lik type topilmadi");
    }
    return type;
  }

  update(id: string, updateTypeDto: UpdateTypeDto) {
    return this.typeSchema.findByIdAndUpdate(id, updateTypeDto);
  }

  remove(id: string) {
    return  this.typeSchema.findByIdAndDelete(id)
  }
}
