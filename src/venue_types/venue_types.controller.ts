import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VenueTypesService } from "./venue_types.service";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("VenueTypes")
@Controller("venue-types")
export class VenueTypesController {
  constructor(private readonly venueTypesService: VenueTypesService) {}

  @ApiOperation({ summary: "Yangi venue type yaratish" })
  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypesService.create(createVenueTypeDto);
  }

  @ApiOperation({ summary: "Barcha venue typelarni olish" })
  @Get()
  findAll() {
    return this.venueTypesService.findAll();
  }

  @ApiOperation({ summary: "Venue type id orqali olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.venueTypesService.findOne(id);
  }

  @ApiOperation({ summary: "Venue type yangilash" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto
  ) {
    return this.venueTypesService.update(id, updateVenueTypeDto);
  }

  @ApiOperation({ summary: "Venue type o‘chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.venueTypesService.remove(id);
  }
}
