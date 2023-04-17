import { Module } from '@nestjs/common';
import { AuctionService } from './service/auction.service';
import { AuctionController } from './controller/auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionEntity } from './models/auction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuctionEntity]),
  ],
  providers: [AuctionService],
  controllers: [AuctionController],
  exports: [AuctionService]
})
export class AuctionModule {}
