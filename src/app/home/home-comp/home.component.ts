import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetailsModel } from '../../shared/model/user/details.model';
import { UserService } from '../../shared/service/user.service';
import { PortfolioItem } from '../../shared/model/stock/portfolioItem.model';
import { Order } from '../../shared/model/stock/order.model';
import { StockService } from '../../shared/service/stock.service';
import { Transaction } from '../../shared/model/transaction/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction.service.';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userData: UserDetailsModel;
    portfolio: PortfolioItem[];
    transactions: Transaction[];
    portfolioValue: number;
    valueLastUpdated: number = 0;

    orderForm: FormGroup;
    order: Order;

  constructor(
      private router : Router, 
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private userService : UserService,
      private stockService : StockService,
      private transactionService: TransactionService) {
        this.order = new Order();
        this.fetchPortfolio();
        this.fetchUserDetails();
        this.fetchTransactions();
      }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      ticker: [
        this.order.ticker, [Validators.required]
      ],
      amount: [this.order.amount, [
        Validators.required
      ]]
    });
  }

  fetchUserDetails() {
    this.userService.getDetails().subscribe(
      (userData: UserDetailsModel) => {
        this.userData = userData;
        console.log(this.userData)
      }
    ); 
  }

  fetchPortfolio() {
    this.stockService.getMyPortfolio().subscribe(
      (data: PortfolioItem[]) => {
        this.portfolio = data;
        console.log(this.portfolio);
      }
    );
  }

  getPortfolioValue() {
    if (!this.portfolio) return -1;
      if ((this.valueLastUpdated + 15000) <= Date.now()) {
        let sum = 0;
        for(let stock of this.portfolio) {
          sum += this.getCurrentPrice(stock.ticker);
        }
        this.portfolioValue = sum;
      }
      return this.portfolioValue;
  }

  getCurrentPrice(ticker: String) {
      return this.stockService.getCurrentPrice(ticker);
  }

  fetchTransactions() {
    this.transactionService.getMyTransactions().subscribe(
      (data : Transaction[] ) => {
         this.transactions = data;
         console.log(this.transactions);
      }
    );
  }

  buyStock() {
    this.order = Object.assign({}, this.orderForm.value);    
    console.log("Buy Order: " + this.order.ticker + " - " + this.order.amount + " Shares");
    this.stockService.buyStock(this.order).subscribe(
        (success : boolean) => {
          if (success) {
            console.log("Buy Successful.");
            alert("Buy Successful.")
          } else {
            console.log("Buy Failed: " + success);
            alert("Buy Failed. Check Console.")
          }
        },
        (res: HttpErrorResponse) => {
          console.log(res);
          if (res.status == 422) {
            alert("Insufficient Balance.");
          }
        }
    );
  }

  get ticker(){
    return this.orderForm.get('ticker');
  }
  
  get amount(){
    return this.orderForm.get('amount');
  }
}