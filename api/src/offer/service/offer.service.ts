import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferEntity } from '../models/offer.entity';
import { Offer } from '../models/offer.interface';

@Injectable()
export class OfferService {

    constructor (
        @InjectRepository(OfferEntity)
        private readonly auctionRepository: Repository<OfferEntity>) {}

    createOffer(offer: Offer): Promise<Offer> {
        return this.auctionRepository.save(offer);
    }
}
