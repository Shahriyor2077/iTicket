import { Module } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { District, DistrictSchema } from "./schemas/district.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: District.name,
        schema: DistrictSchema,
      },

      {
        name: Region.name,
        schema: RegionSchema,
      },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
