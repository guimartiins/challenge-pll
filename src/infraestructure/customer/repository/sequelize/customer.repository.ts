import { type Sequelize } from 'sequelize-typescript'
import Customer from '../../../../domain/entity/customer'
import type CustomerRepositoryInterface from '../../../../domain/repository/customer.repository'
import CustomerModel from './customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  constructor(private readonly sequelize: Sequelize) {}
  async getCustomersForTransferenceByNumberAccounts(
    payerNumberAccount: string,
    receiverNumberAccount: string,
  ): Promise<Customer[]> {
    try {
      const customers = await CustomerModel.findAll({
        where: {
          numberAccount: [payerNumberAccount, receiverNumberAccount],
        },
      })

      const formattedCustomers = customers.map((customer) => {
        return new Customer(
          customer.id,
          customer.name,
          customer.cpf,
          customer.balance,
          customer.numberAccount,
        )
      })

      return formattedCustomers
    } catch (error) {
      console.error(error)
      throw new Error(
        'Error on get customers for transference by number accounts',
      )
    }
  }
}
