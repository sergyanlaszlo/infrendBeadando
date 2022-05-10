import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import {Transaction} from './transaction'

@Entity()
export class Bankaccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idOfOwner : string;

    @Column() 
    balance : number;

    @OneToMany(type => Transaction, transaction => transaction.accountNumber1)
    transaction: Transaction[];
}
