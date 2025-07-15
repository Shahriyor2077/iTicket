import { Module } from "@nestjs/common";
import { SetTypeService } from "./set_type.service";
import { SetTypeController } from "./set_type.controller";
import { SetType, SetTypeSchema } from "./schema/set_type.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SetType.name,
        schema: SetTypeSchema,
      },
    ]),
  ],
  controllers: [SetTypeController],
  providers: [SetTypeService],
})
export class SetTypeModule {}
