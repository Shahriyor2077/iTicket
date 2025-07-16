import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VenuePhotoService } from "./venue_photo.service";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("VenuePhoto")
@Controller("venue-photo")
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @ApiOperation({ summary: "Yangi venue photo yaratish" })
  @Post()
  create(@Body() createVenuePhotoDto: CreateVenuePhotoDto) {
    return this.venuePhotoService.create(createVenuePhotoDto);
  }

  @ApiOperation({ summary: "Barcha venue photolarni olish" })
  @Get()
  findAll() {
    return this.venuePhotoService.findAll();
  }

  @ApiOperation({ summary: "Venue photo id orqali olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.venuePhotoService.findOne(id);
  }

  @ApiOperation({ summary: "Venue photo yangilash" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto
  ) {
    return this.venuePhotoService.update(id, updateVenuePhotoDto);
  }

  @ApiOperation({ summary: "Venue photo o‘chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.venuePhotoService.remove(id);
  }
}
