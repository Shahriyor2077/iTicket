import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { TypesModule } from "./type/types.module";
import { RegionModule } from "./region/region.module";
import { SetTypeModule } from "./set_type/set_type.module";
import { DeliveryMethodModule } from "./delivery_method/delivery_method.module";
import { PaymentMethodModule } from "./payment_method/payment_method.module";
import { TicketStatusModule } from "./ticket_status/ticket_status.module";
import { LanguageModule } from "./language/language.module";
import { HumanCategoryModule } from "./human_category/human_category.module";
import { DistrictModule } from "./district/district.module";
import { VenueModule } from "./venue/venue.module";
import { CustomerAddressModule } from "./customer_address/customer_address.module";
import { CustomerCardModule } from "./customer_card/customer_card.module";
import { CustomerModule } from "./customer/customer.module";
import { VenueTypesModule } from "./venue_types/venue_types.module";
import { VenuePhotoModule } from "./venue_photo/venue_photo.module";
import { SeatModule } from "./seat/seat.module";
import { EventModule } from './event/event.module';
import { EventTypeModule } from './event_type/event_type.module';
import { TicketModule } from './ticket/ticket.module';
import { CardItemModule } from './card_item/card_item.module';
import { CardModule } from './card/card.module';
import { BookingModule } from './booking/booking.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    TypesModule,
    RegionModule,
    SetTypeModule,
    DeliveryMethodModule,
    PaymentMethodModule,
    TicketStatusModule,
    LanguageModule,
    HumanCategoryModule,
    DistrictModule,
    VenueModule,
    CustomerAddressModule,
    CustomerCardModule,
    CustomerModule,
    VenueTypesModule,
    VenuePhotoModule,
    SeatModule,
    SetTypeModule,
    EventModule,
    EventTypeModule,
    TicketModule,
    CardItemModule,
    CardModule,
    BookingModule, 
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
