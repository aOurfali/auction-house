import { Component, OnInit } from '@angular/core';
import { Auction } from '../model/auction.interface';
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
  products: Auction[] = [];

    responsiveOptions: any[] = [];

    constructor(private productService: AuctionService) {}

    ngOnInit() {
        this.productService.getProducts().then((products: Auction[]) => {
            this.products = products;
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
