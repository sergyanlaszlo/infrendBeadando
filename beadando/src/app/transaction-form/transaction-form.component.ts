import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  transactionForm!: FormGroup;
  transactions : Transaction[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private transactionService : TransactionService,
    private router : Router,
    private activatedroute : ActivatedRoute
  ) { }

  get f(): { [key : string]: AbstractControl } {
    return this.transactionForm.controls;
  }

 async ngOnInit() {
   const id = this.activatedroute.snapshot.queryParams['transactionid'];
   this.transactions = await this.transactionService.getAllTransactions();

   this.transactionForm = this.formBuilder.group({
    transactionid : [],
    accountnumber1 : ['', Validators.compose([Validators.pattern('[0-9]{6}'), Validators.required])],
    accountnumber2 : ['', Validators.compose([Validators.pattern('[0-9]{6}'), Validators.required])],
    sumOfTransaction : ['', Validators.required],
    description : ['',Validators.required],
    date : []
   });

   if(id) {
     const transaction = await this.transactionService.getTransactionById(id);
     this.transactionForm.controls['transactionid'].setValue(transaction?.transactionid);
     this.transactionForm.controls['accountNumber1'].setValue(transaction?.accountNumber1);
     this.transactionForm.controls['accountNumber2'].setValue(transaction?.accountNumber2);
     this.transactionForm.controls['sumOfTransaction'].setValue(transaction?.sumOfTransaction);
     this.transactionForm.controls['description'].setValue(transaction?.description);
     this.transactionForm.controls['date'].setValue(transaction?.date);
   }
   else {
     this.transactionForm.controls['transactionid'].addValidators(this.transactionAlreadyExists(this.transactions))
   }
  }

  private transactionAlreadyExists(list: Transaction[]): ValidatorFn {
    return (control : AbstractControl): ValidationErrors | null => {
      const index = list.find(x => x.transactionid === control.value)

      if (index === undefined) {
        return null;
      }
      else {
        return {transactionAlreadyExists : true}
      }
    }
  }

  async createTransaction() {
    const transaction = this.transactionForm.value;
    this.transactionService.createTransaction(transaction);
    this.router.navigateByUrl('/transaction-list');
  }

}
