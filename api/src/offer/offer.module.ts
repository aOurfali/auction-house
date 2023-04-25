import { Module } from '@nestjs/common';
import { OfferService } from './service/offer.service';
import { OfferController } from './controller/offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './models/offer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OfferEntity]),
      ],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService]
})
export class OfferModule {}
