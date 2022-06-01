import { getRepository, Repository } from "typeorm";
import { Bankaccount } from "../entity/bankaccount";
import { Transaction } from "../entity/transaction";
import { Controller } from "./base.controller";

export class TransactionController extends Controller {
    repository = getRepository(Transaction);
    accountRepository = getRepository(Bankaccount);

    getAll = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository.createQueryBuilder('transaction')
            .where("transaction.transactionid LIKE CONCAT('%', :search, '%')", {search : search}).getMany();
            res.json(entities);
        } catch (err) {
            res.status(500).json({ message : err.message});
        }     
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const entity = await this.repository.findOne(({ transactionid : id }));

            if (!entity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            await this.repository.delete(entity);
            res.status(200).send();
        } catch (err) {
            res.status(500).json({ message: 'DELETE HIBA!!' });
        }
    }
}