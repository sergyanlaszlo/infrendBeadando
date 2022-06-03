import { Bankclient } from "./bankclient";
import { Bankaccount } from "./bankaccount";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    transactionid : number;
    

    @ManyToOne(type => Bankaccount, bankaccount => bankaccount.id, {
        eager : true
    })
    source: Bankaccount;


    @ManyToOne(type => Bankaccount, bankaccount => bankaccount.id, {
        eager : true
    })
    destination: Bankaccount;

    @Column()
    sumOfTransaction : number;

    @Column()
    description : string;

}