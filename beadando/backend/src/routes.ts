import * as express from 'express';
import { BankaccountController } from './Controller/bankaccount.controller';
import { BankclientController } from './Controller/bankclient.controller';
import { TransactionController } from './Controller/transaction.controller';

export function getRouter() {
    const router = express.Router();

    const bankaccountController = new BankaccountController();
    const bankclientController = new BankclientController();
    const transactionController = new TransactionController();

    router.get('/bankaccount', bankaccountController.getAll);
    router.post('/bankaccount', bankaccountController.create);
    router.delete('/bankaccount/:id', bankaccountController.delete);
    router.put('/bankaccount', bankaccountController.update);
    router.get('/bankaccount:id', bankaccountController.getOne);

    router.get('/bankclient', bankclientController.getAll);
    router.get('/bankaccount', bankaccountController.getOne);
    router.get('/bankclient:id', bankclientController.getById);
    router.delete('/bankaccount:id', bankaccountController.delete);
    router.put('/bankaccount', bankaccountController.create);
    

    return router;
}
