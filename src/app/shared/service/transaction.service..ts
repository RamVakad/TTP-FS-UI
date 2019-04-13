import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly rootUrl = 'http://127.0.0.1:8484/api/transactions';
  constructor(private http: HttpClient) { }

  getMyTransactions(): Observable<Transaction[]> { 
    return this.http.get<Transaction[]>( this.rootUrl +"/myTransactions");
  }
}