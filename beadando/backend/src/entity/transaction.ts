import { Bankclient } from "./bankclient";
import { Bankaccount } from "./bankaccount";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    transactionid : number;

    source: Bankaccount;

    destination: Bankaccount;

    @Column()
    sumOfTransaction : number;

    @Column()
    description : string;

}