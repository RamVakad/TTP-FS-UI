import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserDetailsModel } from '../../shared/model/user/details.model';
import { UserService } from '../../shared/service/user.service';
import { PortfolioItem } from '../../shared/model/stock/portfolioItem.model';
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

  constructor(
      private router : Router, 
      private userService : UserService,
      private stockService : StockService,
      private transactionService: TransactionService)
      {
         this.fetchUserDetails();
         this.fetchPortfolio();
         this.fetchTransactions();
      }

  ngOnInit() {

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

  fetchTransactions() {
    this.transactionService.getMyTransactions().subscribe(
      (data : Transaction[] ) => {
         this.transactions = data;
         console.log(this.transactions);
      }
    );
  }
}