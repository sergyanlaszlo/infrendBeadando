import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bankaccount } from '../models/bankaccount';
import { BankaccountService } from '../services/bankaccount.service';

@Component({
  selector: 'app-bankaccount-list',
  templateUrl: './bankaccount-list.component.html',
  styleUrls: ['./bankaccount-list.component.css']
})
export class BankaccountListComponent implements OnInit {

  bankaccountForm!: FormGroup;
  bankaccounts : Bankaccount[] = [];

  constructor(
    private formBuilder : FormBuilder,
    private bankaccountService : BankaccountService,
    private router : Router,
    private activatedroute : ActivatedRoute
  ) { }

  get f(): { [key : string]: AbstractControl } {
    return this.bankaccountForm.controls;
  }

  async ngOnInit(){
    const id = this.activatedroute.snapshot.queryParams['id'];
    this.bankaccounts = await this.bankaccountService.getAllBankAccounts();

  this.bankaccountForm = this.formBuilder.group({
    id: [],
    idOfOwner : [],
    balance : []
  });

  if (id) {
    const bankaccount = await this.bankaccountService.searchBankAccountByNumber(id);
    this.bankaccountForm.controls['id'].setValue(bankaccount?.id);
    this.bankaccountForm.controls['idOfOwner'].setValue(bankaccount?.idOfOwner);
    this.bankaccountForm.controls['balance'].setValue(bankaccount?.balance);
  }
  
}
}
