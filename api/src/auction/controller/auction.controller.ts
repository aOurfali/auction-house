import { Body, Controller, Param, Post, UseGuards, Request, Get, Delete, Put } from '@nestjs/common';
import { AuctionService } from '../service/auction.service';
import { Auction } from '../models/auction.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/user/models/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { hasRoles } from 'src/auth/decorator/roles.decorater';

@Controller('auction')
export class AuctionController {

    constructor(private auctionService: AuctionService) {}

    @Post()
    createAuction(@Body() auction: Auction, @Request() req): Promise<Auction> {
        auction.userId = req.user.id
        return this.auctionService.createAuction(auction);
    }

    @Get(':id')
    findAuction(@Param() params): Observable<Auction> {
        return this.auctionService.findAuction(params.id)
    }

    @Get()
    findAllAuctions(): Observable<Auction[]> {
        return this.auctionService.findAllAuctions();
    }

    @Delete(':id')
    deleteAuction(@Param('id')id: number): Observable<any> {
        return this.auctionService.deleteAuction(id);
    }

    @Put('id')
    updateAuction(@Param('id')id: number, @Body() auction: Auction): Observable<any> {
        auction.id = id;
        return this.auctionService.updateAuction(auction);
    }

}
