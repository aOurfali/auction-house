import { Component, OnInit } from '@angular/core';
import { Auction } from '../model/auction.interface';
import { AuctionService } from '../services/auction.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {
  
  auctions: Auction[] = [];

    responsiveOptions: any[] = [];

    images: any[] = [];

    constructor(private productService: AuctionService,
                private photoService: PhotoService) {}

    ngOnInit() {

        this.productService.getProducts().then((data) => {if (data) this.auctions = data.slice(0, 12)});

        this.photoService.getImages().then((images: any[]) => {
            this.images = images;
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
