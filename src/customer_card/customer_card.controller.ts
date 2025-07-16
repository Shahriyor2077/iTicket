import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerCardService } from "./customer_card.service";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("CustomerCard")
@Controller("customer-card")
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: "Yangi customer card yaratish" })
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: "Barcha customer cardlarni olish" })
  @Get()
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: "Customer card id orqali olish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.customerCardService.findOne(id);
  }

  @ApiOperation({ summary: "Customer card yangilash" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto
  ) {
    return this.customerCardService.update(id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: "Customer card o‘chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.customerCardService.remove(id);
  }
}
