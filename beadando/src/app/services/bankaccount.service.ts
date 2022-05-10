import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Bankaccount } from '../models/bankaccount'

@Injectable({
  providedIn: 'root'
})
export class BankaccountService {

  constructor(private http: HttpClient) { }

  async getAllBankAccounts() {
    return await lastValueFrom(this.http.get<Bankaccount[]>('/api/bankaccounts'));
}

async searchBankAccountByNumber(id : any) {
  return  await lastValueFrom(this.http.get<Bankaccount[]>('/api/bankaccounts', {
      params : { id
      }
  }));
}

async createBankAccount(bankaccount : Bankaccount) {
  return await lastValueFrom(this.http.post<Bankaccount>('/api/bankaccounts', bankaccount));
}

async  deleteBankAccount(id : number) {
  return await lastValueFrom(this.http.delete<Bankaccount>('/api/bankclients/{$id}'));
}

}