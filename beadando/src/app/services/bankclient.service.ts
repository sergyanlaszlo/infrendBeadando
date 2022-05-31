import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Bankclient } from '../models/bankclient';

@Injectable({
    providedIn : 'root'
})
export class BankclientService {

    constructor(private http: HttpClient) {}

   async getAllBankclients() {
        return await lastValueFrom(this.http.get<Bankclient[]>('/api/bankclient'));
    }

    async getBankclientByID(id: number) {
        return await lastValueFrom(this.http.get<Bankclient>('/api/bankclients/${id}'));
    }

    async getBankclientByName(query : string) {
        return await lastValueFrom(this.http.get<Bankclient>('/api/bankclientsbyname', {
            params : {query}
        }));
    }


    async searchBankclients(query : string) {
        return  await lastValueFrom(this.http.get<Bankclient[]>('/api/bankclients', {
            params : { query
            }
        }));
    }

    async createBankclient(bankclient : Bankclient) {
        return await lastValueFrom(this.http.post<Bankclient>('/api/bankclient', bankclient));
    }

    async  deleteBankclient(id : number) {
        return await lastValueFrom(this.http.delete<Bankclient>('/api/bankclients/{$id}',));
    }
}