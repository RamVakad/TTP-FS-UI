import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDetailsModel } from '../../shared/model/user/details.model';
import { UserService } from '../../shared/service/user.service';
import { PortfolioItem } from '../../shared/model/stock/portfolioItem.model';
import { Order } from '../../shared/model/stock/order.model';
import { StockService } from '../../shared/service/stock.service';
import { Transaction } from '../../shared/model/transaction/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction.service.';
import { MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';

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
    valueLoopStarted: boolean = false;
    navLinks = [ { "label": "Login", 'path':"/login"}, { "label": "Home", 'path':"/home"} ];

    orderForm: FormGroup;
    order: Order;

  constructor(private snackBar: MatSnackBar,
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
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]]
    });
  }

  getBalance() {
    if (this.userData) return this.userData.balance; else return -1;
  }

  fetchUserDetails() {
    this.userService.getDetails().subscribe(
      (userData: UserDetailsModel) => {
        this.userData = userData;
        //console.log(this.userData)
      }
    ); 
  }

  fetchPortfolio() {
    this.stockService.getMyPortfolio().subscribe(
      (data: PortfolioItem[]) => {
        this.portfolio = data;
        //console.log(this.portfolio);
        this.startPortfolioValueLoop();
      }
    );
  }

  fetchTransactions() {
    this.transactionService.getMyTransactions().subscribe(
      (data : Transaction[] ) => {
         this.transactions = data;
         //console.log(this.transactions);
      }
    );
  }

  refreshData() {
    this.fetchUserDetails();
    this.fetchPortfolio();
    this.fetchTransactions();
  }

  getChange(ticker: String) {
    return this.stockService.getChange(ticker);
  }

  isHigher(ticker: String) {
    if (this.stockService.getCurrentHigherThanOpen(ticker) == 1) return true;
  }

  isEqual(ticker: String) {
    if (this.stockService.getCurrentHigherThanOpen(ticker) == 0) return true;
  }

  calculateTotalValue() {
    let sum = 0;
    for(let stock of this.portfolio) {
      sum += (this.getCurrentPrice(stock.ticker) * stock.amount);
    }
    this.portfolioValue = sum;
  }

  startPortfolioValueLoop() {
    if (!this.valueLoopStarted) {
      this.valueLoopStarted = true;
      const source = interval(1000);
      //when timer emits after 5s, complete source
      const example = source;
      //output: 0,1,2,3
      const subscribe = example.subscribe(val => this.calculateTotalValue());
    }
  }

  getFormattedDate(millis: number) {
    let date = new Date(millis);
    return date.toLocaleString();
  }

  getCurrentPrice(ticker: String) {
    return this.stockService.getCurrentPrice(ticker);
  }

  getStockValue(ticker: String, amount: number) {
    return (this.getCurrentPrice(ticker) * amount);
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  getPortfolioValue() {
    if (this.portfolioValue && this.portfolioValue >= 0) return this.portfolioValue; else return null;
  }

  buyStock() {
    this.order = Object.assign({}, this.orderForm.value);    
    console.log("Buy Order: " + this.order.ticker + " - " + this.order.amount + " Shares");
    this.stockService.buyStock(this.order).subscribe(
        (success : boolean) => {
          if (success) {
            console.log("Buy Successful.");
            this.refreshData();
            this.openSnackBar("Buy Successful.", "Close", 5000);
          } else {
            console.log("Buy Failed: " + success);
            this.openSnackBar("Buy Failed. Check Console", "Close", 5000);
          }
        },
        (res: HttpErrorResponse) => {
          console.log(res);
          if (res.status == 422) {
            this.openSnackBar("Insufficient Balance", "Close", 5000);
          } else if (res.status == 400) {
            this.openSnackBar("Invalid Ticker.", "Close", 5000);
          }
        }
    );
  }

  sellStock() {
    this.order = Object.assign({}, this.orderForm.value);    
    console.log("Sell Order: " + this.order.ticker + " - " + this.order.amount + " Shares");
    this.stockService.sellStock(this.order).subscribe(
      (success : boolean) => {
        if (success) {
          console.log("Sell Successful.");
          this.refreshData();
          this.openSnackBar("Sell Successful.", "Close", 5000);
        } else {
          console.log("Sell Failed: " + success);
          this.openSnackBar("Sell Failed. Check Console", "Close", 5000);
        }
      },
      (res: HttpErrorResponse) => {
        console.log(res);
        if (res.status == 422) {
          this.openSnackBar("Insufficient # of shares.", "Close", 5000);
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