import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Language } from "./schemas/language.schema";
import { Model } from "mongoose";

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private readonly languageSchema: Model<Language>
  ) {}
  async create(createLanguageDto: CreateLanguageDto) {
    const exist = await this.languageSchema.findOne({
      name: createLanguageDto.name,
    });
    if (exist) {
      throw new ConflictException("Bunday language allaqachon mavjud");
    }
    return this.languageSchema.create(createLanguageDto);
  }

  findAll() {
    return this.languageSchema.find();
  }

  async findOne(id: string) {
    const language = await this.languageSchema.findOne({ _id: id });
    if (!language) {
      throw new NotFoundException("Bunday id lik language topilmadi");
    }
    return language;
  }

  update(id: string, updateLanguageDto: UpdateLanguageDto) {
    return this.languageSchema.findByIdAndUpdate(id, updateLanguageDto);
  }

  async remove(id: string) {
    return this.languageSchema.findByIdAndDelete(id);
  }
}
