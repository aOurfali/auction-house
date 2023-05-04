import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auction } from '../model/auction.interface';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  constructor(private http: HttpClient) { }

  getProducts(){
      return this.http.get<Auction[]>('http://localhost:3000/auction').toPromise()
      .then(auctions => auctions);;
  }
}
