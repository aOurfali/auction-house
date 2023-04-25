import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { OfferService } from '../service/offer.service';
import { AuthGuard } from '@nestjs/passport';
import { Offer } from '../models/offer.interface';

@Controller('offer')
export class OfferController {
    constructor(private offerService: OfferService) {
    }
    
    @Post()
    @UseGuards(AuthGuard('jwt'))
    createOffer(@Body() offer: Offer, @Request() req): Promise<Offer> {
        offer.userId = req.user.id;
        
        return this.offerService.createOffer(offer);
    }
}
