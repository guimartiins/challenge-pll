import { type Sequelize } from 'sequelize-typescript'
import type Transaction from '../../../../domain/entity/transaction'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import TransactionModel from './transaction.model'

export default class TransactionRepository {
  constructor(private readonly sequelize: Sequelize) {}

  async transfer(transaction: Transaction): Promise<void> {
    const t = await this.sequelize.transaction()

    try {
      await CustomerModel.update(
        {
          balance: this.sequelize.literal(`balance - ${transaction.value}`),
        },
        {
          where: { id: transaction.payerId },
          transaction: t,
        },
      )

      await CustomerModel.update(
        {
          balance: this.sequelize.literal(`balance + ${transaction.value}`),
        },
        {
          where: { id: transaction.receiverId },
          transaction: t,
        },
      )

      await TransactionModel.create({
        id: transaction.id,
        payer_id: transaction.payerId,
        receiver_id: transaction.receiverId,
        value: transaction.value,
      })

      await t.commit()
    } catch (error) {
      console.error(error)

      await t.rollback()
    }
  }
}
