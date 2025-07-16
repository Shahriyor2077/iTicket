import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Types")
@Controller("types")
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @ApiOperation({ summary: "Yangi type yaratish" })
  @Post()
  create(@Body() createTypesDto: CreateTypeDto) {
    return this.typesService.create(createTypesDto);
  }

  @ApiOperation({ summary: "Barcha typelarni olish" })
  @Get()
  findAll() {
    return this.typesService.findAll();
  }

  @ApiOperation({ summary: "Type id orqali olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.typesService.findOne(id);
  }

  @ApiOperation({ summary: "Type yangilash" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTypesDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypesDto);
  }

  @ApiOperation({ summary: "Type o‘chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.typesService.remove(id);
  }
}
