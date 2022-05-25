import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bankaccount } from '../models/bankaccount';
import { BankaccountService } from '../services/bankaccount.service';

@Component({
  selector: 'app-bankaccount-form',
  templateUrl: './bankaccount-form.component.html',
  styleUrls: ['./bankaccount-form.component.css']
})
export class BankaccountFormComponent implements OnInit {

  bankaccountForm!: FormGroup;
  existingBankaccounts : Bankaccount[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private bankaccountService : BankaccountService,
    private router : Router,
    private activatedroute : ActivatedRoute
  ) { }

  get f(): { [key : string]: AbstractControl } {
    return this.bankaccountForm.controls;
  }

  async ngOnInit() {
      const id = this.activatedroute.snapshot.queryParams['id'];
      this.existingBankaccounts = await this.bankaccountService.getAllBankAccounts();
      
      this.bankaccountForm = this.formBuilder.group({
        id : [''],
        balance : ['', Validators.min(0)]
      });
  
      if(id) {
        const bankaccount: any = await this.bankaccountService.searchBankAccountByNumber(id);
        this.bankaccountForm.controls['id'].setValue(bankaccount?.id);
        this.bankaccountForm.controls['balance'].setValue(bankaccount?.balance);
      }
  }

  async addBankAccount() {
    const bankaccount = this.bankaccountForm.value;
    this.bankaccountService.createBankAccount(bankaccount);
    this.router.navigateByUrl('/bankaccount-list')
  }
}

