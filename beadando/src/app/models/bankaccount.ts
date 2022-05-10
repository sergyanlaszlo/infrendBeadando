import { Bankclient } from "./bankclient";

export interface Bankaccount {
    id : number;
    idOfOwner : number;
    balance : number;
}