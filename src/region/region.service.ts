import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./schemas/region.schema";
import { Model } from "mongoose";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) {}
  async create(createRegionDto: CreateRegionDto) {
    const exist = await this.regionSchema.findOne({
      name: createRegionDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday region allaqachon mavjud");
    }
    return this.regionSchema.create(createRegionDto);
  }

  findAll() {
    return this.regionSchema.find().populate("districts");
  }

  async findOne(id: string) {
    const region = await this.regionSchema.findOne({ _id: id });
    if (!region) {
      throw new NotFoundException("Bunday id lik region topilmadi");
    }
    return region;
  }

  update(id: string, updateRegionDto: UpdateRegionDto) {
    return this.regionSchema.findByIdAndUpdate(id, updateRegionDto);
  }

  async remove(id: string) {
    return this.regionSchema.findByIdAndDelete(id);
  }
}
