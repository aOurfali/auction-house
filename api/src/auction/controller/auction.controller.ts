import { Body, Controller, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuctionService } from '../service/auction.service';
import { Auction } from '../models/auction.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('auction')
export class AuctionController {
    constructor(private auctionService: AuctionService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createAuction(@Body() auction: Auction, @Request() req): Promise<Auction> {
        auction.userId = req.user.id
        return this.auctionService.createAuction(auction);
    }
}
