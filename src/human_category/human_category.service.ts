import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HumanCategory } from "./schemas/human_category.schema";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name) private readonly humanCategorySchema: Model<HumanCategory>
  ) {}
  async create(createHumanCategoryDto: CreateHumanCategoryDto) {
    const exist = await this.humanCategorySchema.findOne({
      name: createHumanCategoryDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday humanCategory allaqachon mavjud");
    }
    return this.humanCategorySchema.create(createHumanCategoryDto);
  }

  findAll() {
    return this.humanCategorySchema.find();
  }

  async findOne(id: string) {
    const humanCategory = await this.humanCategorySchema.findOne({ _id: id });
    if (!humanCategory) {
      throw new NotFoundException("Bunday id lik humanCategory topilmadi");
    }
    return humanCategory;
  }

  update(id: string, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return this.humanCategorySchema.findByIdAndUpdate(id, updateHumanCategoryDto);
  }

  async remove(id: string) {
    return this.humanCategorySchema.findByIdAndDelete(id);
  }
}
