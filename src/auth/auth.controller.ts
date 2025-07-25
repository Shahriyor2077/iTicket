import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  ParseIntPipe,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginDto } from "./dto/login.dto";
import { Request, Response } from "express";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";
import { LoginCustomerDto } from "src/customer/dto/login-customer.dto";
@ApiTags("Customer Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  registration(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.registration(createAdminDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDto, res);
  }

  @HttpCode(200)
  @Post("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(req, res);
  }

  @HttpCode(200)
  @Post("logout")
  logout(
    @CookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout(refeshToken, res);
  }

  @ApiOperation({ summary: "Customer login" })
  @ApiBody({
    schema: {
      example: {
        phone: "+998901234567",
        password: "parol123",
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Customer muvaffaqiyatli login qildi.",
  })
  @Post("/customer-login")
  customerLogin(
    @Body() loginDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.customerLogin(loginDto, res);
  }

  @Post("/registerCustomer")
  register(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.register(createCustomerDto);
  }
}
