import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Seat")
@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @ApiOperation({ summary: "Yangi seat yaratish" })
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @ApiOperation({ summary: "Barcha seatlarni olish" })
  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @ApiOperation({ summary: "Seatni id orqali olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seatService.findOne(id);
  }

  @ApiOperation({ summary: "Seatni yangilash" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(id, updateSeatDto);
  }

  @ApiOperation({ summary: "Seatni o‘chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seatService.remove(id);
  }
}
