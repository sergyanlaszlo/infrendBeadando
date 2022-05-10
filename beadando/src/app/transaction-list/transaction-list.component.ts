import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions : Transaction[] | undefined = undefined;
  searchQuery = '';

  constructor(
    private appComponent: AppComponent,
    private transactionService : TransactionService,
    private router : Router
  ) { }

  async ngOnInit() {
    this.transactions = await this.transactionService.getAllTransactions();
  }

  async search() {
   this.transactions  = await this.transactionService.getTransaction(this.searchQuery);
  }

  navigateToTransactionForm(id:any) {
    this.router.navigate(['/transaction-form'], {
      queryParams : {
        id : id
      }
    });
  }

  async deleteTransaction(id : any) {
    await this.transactionService.deleteTransaction(id)
    this.ngOnInit();
  }

}
