import { Bankclient } from "./bankclient";

export interface Bankaccount {
    id : number;
    balance : number;
    owner : Bankclient;
}