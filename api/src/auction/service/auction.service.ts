import { Injectable, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuctionEntity } from '../models/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, catchError, from, map, throwError } from 'rxjs';
import { Auction } from '../models/auction.interface';
import { request } from 'http';

@Injectable()
export class AuctionService {
    constructor (
        @InjectRepository(AuctionEntity)
        private readonly auctionRepository: Repository<Auction>) {}
        
    
    createAuction(auction: Auction): Promise<Auction> {
      const item = this.auctionRepository.create(auction);
        return this.auctionRepository.save(auction);
    }


}
