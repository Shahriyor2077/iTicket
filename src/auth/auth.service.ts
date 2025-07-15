import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AdminDocument } from "../admin/schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateCustomerDto } from "src/customer/dto/create-customer.dto";
import { CustomerService } from "src/customer/customer.service";
import { InjectModel } from "@nestjs/mongoose";
import { Customer, CustomerSchema } from "src/customer/schemas/customer.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerSchema: Model<Customer>,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly customerSevice: CustomerService
  ) {}
  async generateToken(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async registration(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException(
        "Bunday email tizimda avval ro'yxatdan o'tgan"
      );
    }
    const admin = await this.adminService.create(createAdminDto);
    return { adminId: admin._id };
  }

  async login(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki passwprd noto'g'ri");
    }
    const isVAlidPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashed_password
    );
    if (!isVAlidPassword) {
      throw new UnauthorizedException("Email yoki passwprd noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);
    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();
    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return { accessToken };
  }
  async refresh(req: Request, res: Response) {
    const token = req.cookies.refreshToken;
    if (!token) throw new UnauthorizedException("Refresh token topilmadi");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.adminService.findOne(payload.id);
      if (!admin) throw new UnauthorizedException("Admin topilmadi");

      const newAccessToken = await this.jwtService.signAsync(
        { id: admin.id, is_creator: admin.is_creator },
        {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }
      );

      const newRefreshToken = await this.jwtService.signAsync(
        { id: admin.id, is_creator: admin.is_creator },
        {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }
      );

      const hashed_token = bcrypt.hashSync(newRefreshToken, 7);
      admin.hashed_refresh_token = hashed_token;
      await admin.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: +process.env.COOKIE_TIME!,
      });

      return { message: "Token yangilandi", accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException("Token yaroqsiz");
    }
  }

  async logout(refreshToken: string, res: Response) {
    let userData: any;
    try {
      userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }
    await this.adminService.updateRefreshToken(userData.id, "");
    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  async register(createCustomerDto: CreateCustomerDto){
    const candidate=await this.customerSchema.findOne({email: createCustomerDto.email})
    if(candidate){
      throw new ConflictException("Bunday email mavjud")
    }
    const customer=await this.customerSchema.create(createCustomerDto)
    return {customerId: customer._id}
  }
}
