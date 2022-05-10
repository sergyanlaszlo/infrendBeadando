import { Bankaccount } from "./bankaccount"

export interface Bankclient {
    id: number;
    name: string;
    location : string;
    accountnumber : string;
    bankaccount : Bankaccount;
}