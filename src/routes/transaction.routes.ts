import { Router, type Request, type Response } from 'express'
import TransactionController from '../infraestructure/transaction/controller/transaction.controller'
import { type Sequelize } from 'sequelize-typescript'
import CustomerRepository from '../infraestructure/customer/repository/sequelize/customer.repository'
import { connection } from '..'

const router = Router()

router.post(
  '/transactions/transference',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const { value, payerNumberAccount, receiverNumberAccount } = req.body

    const customerRepository = new CustomerRepository(connection as Sequelize)
    const transactionController = new TransactionController(customerRepository)

    try {
      await transactionController.transfer(
        payerNumberAccount as string,
        receiverNumberAccount as string,
        value as number,
      )
      res.status(200).send('Transferência realizada com sucesso')
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message)
      }
    }
  },
)

export default router
