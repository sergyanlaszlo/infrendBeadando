import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BankclientFormComponent } from './bankclient-form/bankclient-form.component';
import { BankclientListComponent } from './bankclient-list/bankclient-list.component';
import { BankaccountService } from './services/bankaccount.service';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [

  {
    path: 'bankclient-list',
    component : BankclientListComponent
  },
  {
    path: 'bankclient-form',
    component: BankclientFormComponent
  },
  { 
    path: 'transaction-list',
    component: TransactionListComponent
  },
  {
    path:'',
    component : BankclientListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }