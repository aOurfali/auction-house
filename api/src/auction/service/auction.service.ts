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
        private readonly auctionRepository: Repository<AuctionEntity>) {}

    updateAuction(auction: Auction): Observable<any> {
        return from(this.auctionRepository.save(auction));
    }

    deleteAuction(id: number): Observable<any> {
        return from(this.auctionRepository.delete(id));
    }

    findAllAuctions(): Observable<Auction[]> {
        return from(this.auctionRepository.find());
    }

    findAuction(id: any): Observable<Auction> {
       return from(this.auctionRepository.findOneBy({id}));
    }
    
    createAuction(auction: Auction): Promise<Auction> {
        return this.auctionRepository.save(auction);
    }

}
