import { type Sequelize } from 'sequelize-typescript'
import type Transaction from '../../../../domain/entity/transaction'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import TransactionModel from './transaction.model'
import { type TransactionRepositoryInterface } from '../../../../domain/repository/transaction.repository'

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  constructor(private readonly sequelize: Sequelize) {}

  async transfer(transaction: Transaction): Promise<void> {
    const t = await this.sequelize.transaction()

    try {
      await CustomerModel.update(
        {
          balance: transaction.payer.balance,
        },
        {
          where: { id: transaction.payer.id },
          transaction: t,
        },
      )

      await CustomerModel.update(
        {
          balance: transaction.receiver.balance,
        },
        {
          where: { id: transaction.receiver.id },
          transaction: t,
        },
      )

      const payload = {
        id: transaction.id,
        payer_id: transaction.payer.id,
        receiver_id: transaction.receiver.id,
        value: transaction.value,
      }
      console.log(payload)

      await TransactionModel.create(payload, { transaction: t })

      await t.commit()
    } catch (error) {
      console.error(error)

      await t.rollback()
    }
  }
}
