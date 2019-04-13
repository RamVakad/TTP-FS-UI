import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PortfolioItem } from '../model/stock/portfolioItem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  readonly rootUrl = 'http://127.0.0.1:8484/api/stocks';
  constructor(private http: HttpClient) { }

  getMyPortfolio(): Observable<PortfolioItem[]> { 
    return this.http.get<PortfolioItem[]>( this.rootUrl +"/myPortfolio");
  }
  
}

