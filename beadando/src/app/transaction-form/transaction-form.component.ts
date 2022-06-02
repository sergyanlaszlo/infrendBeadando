import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { BankaccountService } from '../services/bankaccount.service';
import { Repository, getRepository } from 'typeorm';
import { Bankaccount } from 'backend/src/entity/bankaccount';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  transactionForm!: FormGroup;
  transactions : Transaction[] = [];
 // repository = getRepository(Bankaccount); ezt dobja : ColumnTypeUndefinedError: Column type for Transaction#accountNumber1 is not defined and cannot be guessed.
 // Make sure you have turned on an "emitDecoratorMetadata": true option in tsconfig.json.
 // Also make sure you have imported "reflect-metadata" on top of the main entry file in your application (before any entity imported).If you are using JavaScript instead of TypeScript you must explicitly provide a column type.

  constructor(
    private formBuilder : FormBuilder,
    private transactionService : TransactionService,
    private bankaccountService : BankaccountService,
    private router : Router,
    private activatedroute : ActivatedRoute
  ) { }

  get f(): { [key : string]: AbstractControl } {
    return this.transactionForm.controls;
  }

 async ngOnInit() {

  this.transactionForm = this.formBuilder.group({
    transactionid : [],
    accountNumber1 : ['', Validators.compose([Validators.pattern('[0-9]{6}'), Validators.required])],
    accountNumber2 : ['', Validators.compose([Validators.pattern('[0-9]{6}'), Validators.required])],
    sumOfTransaction : ['', Validators.required],
    description : ['', Validators.required]
   });

   const id = this.activatedroute.snapshot.queryParams['transactionid'];
   this.transactions = await this.transactionService.getAllTransactions();

   
   if(id) {
     const transaction = await this.transactionService.getTransactionById(id);
     this.transactionForm.controls['transactionid'].setValue(transaction?.transactionid);
     this.transactionForm.controls['accountNumber1'].setValue(transaction?.accountNumber1);
     this.transactionForm.controls['accountNumber2'].setValue(transaction?.accountNumber2);
     this.transactionForm.controls['sumOfTransaction'].setValue(transaction?.sumOfTransaction);
     this.transactionForm.controls['description'].setValue(transaction?.description);
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
/*
  async updateAccountOnTransaction() {
   const accountNumber1 = this.transactionForm.get('accountNumber1')?.value;
   const accountNumber2 = this.transactionForm.get('accountNumber2')?.value;
   const changeOfBalance = this.transactionForm.get('sumOfTransaction')?.value;


   const bankaccountToModify = getRepository(Bankaccount).findOne(({ id : accountNumber1 }));
   

   try {
    await this.repository.createQueryBuilder('bankaccount').
    where("bankaccount.id LIKE :search", {search : accountNumber1}).update("UPDATE bankaccount SET balance = (balance - :changeOfBalance)", {changeOfBalance : changeOfBalance});
    await this.repository.createQueryBuilder('bankaccount').
    where("bankaccount.id LIKE :search", {search : accountNumber2}).update("UPDATE bankaccount SET balance = (balance + :changeOfBalance)", {changeOfBalance : changeOfBalance});
} catch (err) {
  console.log('ERROR');
}    
  

                                    }
                                    
                                    }
                                    */
}
