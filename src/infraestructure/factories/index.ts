import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customer.model'
import TransactionModel from '../transaction/repository/sequelize/transaction.model'

const DBConnectionFactory = (): Sequelize => {
  const sequelize = new Sequelize(
    'postgres://postgres:postgres@0.0.0.0:5432/postgres',
  )
  sequelize.addModels([CustomerModel, TransactionModel])

  return sequelize
}

export { DBConnectionFactory }
