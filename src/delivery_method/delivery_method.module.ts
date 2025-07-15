import { Module } from '@nestjs/common';
import { DeliveryMethodService } from './delivery_method.service';
import { DeliveryMethodController } from './delivery_method.controller';
import { RegionSchema } from '../region/schemas/region.schema';
import { DeliveryMethod, DeliveryMethodSchema } from './schemas/delivery_method.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
      imports: [
        MongooseModule.forFeature([
          {
            name: DeliveryMethod.name,
            schema: DeliveryMethodSchema,
          },
        ]),
      ],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
})
export class DeliveryMethodModule {}
