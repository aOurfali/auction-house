import { Component, OnInit } from '@angular/core';
import { Auction } from '../model/auction.interface';
import { AuctionService } from '../services/auction.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
    auctions: Auction[] = [];

    responsiveOptions: any[] = [];

    images: any[] = [];

    constructor(private productService: AuctionService,
                private photoService: PhotoService) {}

    ngOnInit() {

        this.productService.getProducts().then(auctions => {
            if (auctions) {this.auctions = auctions;}
        });

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
