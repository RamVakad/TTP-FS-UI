import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PortfolioItem } from '../model/stock/portfolioItem.model';
import { Order } from '../model/stock/order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  readonly rootUrl = 'http://127.0.0.1:8484/api/stocks';
  readonly iexRoot = "https://api.iextrading.com/1.0/stock";

  currentPrices: Map<String, number>;
  lastUpdated: Map<String, number>;
  updating: Map<String, boolean>;
  
  constructor(private http: HttpClient) {
    this.currentPrices = new Map<String, number>();
    this.lastUpdated = new Map<String, number>();
    this.updating = new Map<String, boolean>();
  }

  getMyPortfolio(): Observable<PortfolioItem[]> { 
    return this.http.get<PortfolioItem[]>( this.rootUrl +"/myPortfolio");
  }

  getCurrentPrice(ticker: String) {
    if (this.lastUpdated.has(ticker)) {
        if ((this.lastUpdated.get(ticker) + 15000) <= Date.now()) {
            this.updatePrice(ticker);
        }
        return this.currentPrices.get(ticker);
    } else {
        this.updatePrice(ticker);
        return -1;
    }
  }

  updatePrice(ticker: String) {
    if (this.updating.get(ticker)) return;

    this.updating.set(ticker, true);
    var reqHeader = new HttpHeaders({'IEX':'True'});
    let url = this.iexRoot + "/" + ticker + "/price";
    this.http.get(url, { responseType: 'text', headers : reqHeader }).subscribe((price) => {
        this.currentPrices.set(ticker, Number(price));
        this.lastUpdated.set(ticker, Date.now());
        this.updating.set(ticker, false);
    });
  }

  buyStock(order: Order) {
    return this.http.post(this.rootUrl +"/buy", order);
  }
  
}

