import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne } from "typeorm";
import { Bankclient } from "./bankclient";
import {Transaction} from './transaction'

@Entity()
export class Bankaccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    balance : number;

    @ManyToOne(type => Bankclient, bankclient => bankclient.accounts, {
        eager: true
    })
    owner: Bankclient;

    // @OneToMany(type => Transaction, transaction => transaction.accountNumber1)
    // transactions: Transaction[];
}
