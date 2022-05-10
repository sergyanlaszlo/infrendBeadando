import { Bankclient } from "./bankclient";
import { Bankaccount } from "./bankaccount";

export interface Transaction {
    transactionid : number;
    accountNumber1 : Bankaccount;
    accountNumber2 : Bankaccount;
    sumOfTransaction : number;
    description : string;
    date : Date;
}