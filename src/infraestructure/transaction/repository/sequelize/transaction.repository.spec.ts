import { Sequelize } from 'sequelize-typescript'
import Customer from '../../../../domain/entity/customer'
import Transaction from '../../../../domain/entity/transaction'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'
import TransactionModel from './transaction.model'
import TransactionRepository from './transaction.repository'

describe('transaction repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel, TransactionModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should transfer money between accounts', async () => {
    const payer = new Customer('123', 'John Doe', '12345678900', 1000, '1234')
    const receiver = new Customer('321', 'Jane Doe', '09876543211', 500, '4321')
    payer.subtractBalance(500)
    receiver.addBalance(500)
    const transaction = new Transaction(123, payer, receiver, 500)

    await CustomerModel.create({
      id: payer.id,
      name: payer.name,
      cpf: payer.cpf,
      balance: payer.balance,
      numberAccount: payer.numberAccount,
    })

    await CustomerModel.create({
      id: receiver.id,
      name: receiver.name,
      cpf: receiver.cpf,
      balance: receiver.balance,
      numberAccount: receiver.numberAccount,
    })

    const transactionRepository = new TransactionRepository(sequelize)

    await transactionRepository.transfer(transaction)

    const payerModel = await CustomerModel.findOne({
      where: { id: payer.id },
    })
    const receiverModel = await CustomerModel.findOne({
      where: { id: receiver.id },
    })
    const transactionModel = await TransactionModel.findOne({
      where: { id: transaction.id },
    })

    expect(payerModel?.balance).toBe(500)
    expect(receiverModel?.balance).toBe(1000)
    expect(transactionModel?.id).toEqual(transaction.id)
    expect(transactionModel?.payer_id).toEqual(transaction.payer.id)
    expect(transactionModel?.receiver_id).toEqual(transaction.receiver.id)
  })
})
