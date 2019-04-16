import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { PortfolioItem } from '../model/stock/portfolioItem.model';
import { Order } from '../model/stock/order.model';
import { Subscription, timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StockService implements OnDestroy {

  readonly rootUrl = 'http://127.0.0.1:8484/api/stocks';
  readonly iexRoot = "https://api.iextrading.com/1.0/stock";

  currentPrices: Map<String, number> = new Map();
  companyInfo: Map<String, Object> = new Map();
  ohlcInfo: Map<String, Object> = new Map();
  subscriptions: Map<String, Subscription> = new Map();
  
  constructor(private http: HttpClient) { }

  getMyPortfolio(): Observable<PortfolioItem[]> { 
    return this.http.get<PortfolioItem[]>( this.rootUrl +"/myPortfolio");
  }
  
  getCurrentPrice(ticker: String) {
    if (this.subscriptions.has(ticker)) {
      if (this.currentPrices.has(ticker)) {
        return this.currentPrices.get(ticker);
      } else {
        return -1;
      }
    } else {
      this.subscriptions.set(ticker, new Subscription()); //Lock the creation of duplicate subscriptions.
      let subscription = timer(0, 5000).pipe(
        switchMap(() => this.getLatestPrice(ticker))
      ).subscribe((price) => {
        this.currentPrices.set(ticker, Number(price));
        this.updateChange(ticker);
        //console.log("Updated price of " + ticker + ".");
      });
      this.subscriptions.set(ticker, subscription);
      return -1;
    }
  }

  getCompanyData(ticker: String) {
    if (this.companyInfo.has(ticker)) {
      return this.companyInfo.get(ticker);
    } else {
      return null;
    }
  }

  getOhlc(ticker: String) {
    if (this.ohlcInfo.has(ticker)) {
      return this.ohlcInfo.get(ticker);
    } else {
      this.ohlcInfo.set(ticker, { 'open': { 'price': 0 }});
      let reqHeader = new HttpHeaders({'IEX':'True'});
      let url = this.iexRoot + "/" + ticker + "/ohlc";
      this.http.get(url, { headers : reqHeader }).subscribe(
        (data) => {
          this.ohlcInfo.set(ticker, data);
        }
      );
    }
  }

  getCurrentHigherThanOpen(ticker: String) {
    if (this.ohlcInfo.has(ticker)) {
      let open = this.ohlcInfo.get(ticker)["open"]["price"];
      let current = this.currentPrices.get(ticker);
      if (open == current) return 0;
      return current > open ? 1 : -1;
    } else {
      return 0;
    }
  }

  changeCache: Map<String, String> = new Map();
  
  getChange(ticker: String) {
    return this.changeCache.get(ticker);
  }

  updateChange(ticker: String) {
    if (!this.ohlcInfo.has(ticker)) {
      return;
    }
    let openPrice =  this.getOhlc(ticker)['open']['price'];
    let diff = (this.getCurrentPrice(ticker) - openPrice);
    let ret: String = diff > 0 ? " + $" : " - $";
    if (Number(diff) == 0) ret = "$";
    ret = ret + Math.abs(diff).toFixed(2);
    let percent = (Math.abs(Number(diff)) / openPrice) * 100;
    ret = ret + " (" + percent.toFixed(2) + "%)";
    this.changeCache.set(ticker, ret);
  }

  getCompanyName(ticker: String) {
    if (this.companyInfo.has(ticker)) {
      return this.companyInfo.get(ticker)['companyName'];
    } else {
      this.companyInfo.set(ticker, {'companyName': ticker});
      let reqHeader = new HttpHeaders({'IEX':'True'});
      let url = this.iexRoot + "/" + ticker + "/company";
      this.http.get(url, { headers : reqHeader }).subscribe(
        (data) => {
          this.companyInfo.set(ticker, data);
        }
      );
      this.getOhlc(ticker);
      return ticker;
    }
  }

  getLatestPrice(ticker: String) {
    let reqHeader = new HttpHeaders({'IEX':'True'});
    let url = this.iexRoot + "/" + ticker + "/price";
    return this.http.get(url, { responseType: 'text', headers : reqHeader });
  }

  ngOnDestroy(){
    this.subscriptions.forEach((value: Subscription, key: String) => {
      value.unsubscribe();
    });
  }

  buyStock(order: Order) {
    return this.http.post(this.rootUrl +"/buy", order);
  }

  sellStock(order: Order) {
    return this.http.post(this.rootUrl +"/sell", order);
  }

  /*
  //Bad bad bad
  getCurrentPriceOld(ticker: String) {
    if (this.lastUpdated.has(ticker)) {
        console.log(Date.now());
        if ((this.lastUpdated.get(ticker) + 1500) <= Date.now()) {
            this.updatePrice(ticker);
        }
        return this.currentPrices.get(ticker);
    } else {
        this.updatePrice(ticker);
        return -1;
    }
  }

  updatePrice(ticker: String) {
    console.log("Update price called on " + ticker + ".");
    if (this.updating.get(ticker)) return;
    this.updating.set(ticker, true);
    var reqHeader = new HttpHeaders({'IEX':'True'});
    let url = this.iexRoot + "/" + ticker + "/price";
    this.http.get(url, { responseType: 'text', headers : reqHeader }).subscribe((price) => {
        this.currentPrices.set(ticker, Number(price));
        this.lastUpdated.set(ticker, Date.now());
        this.updating.set(ticker, false);
        console.log("Updated price of " + ticker + ".");
    });
  }
*/

}

