import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Bankaccount } from "./bankaccount";


@Entity()
export class Bankclient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location : string;

    @Column()
    accountnumber : string;

    @Column()
    bankaccount : Bankaccount;
}