import type Customer from '../entity/customer'
import Transaction from '../entity/transaction'

export default class CustomerService {
  static transfer(
    customerOne: Customer,
    customerTwo: Customer,
    value: number,
  ): void {
    if (customerOne.balance < value) {
      throw new Error('Customer has no balance')
    }

    customerOne.subtractBalance(value)
    customerTwo.addBalance(value)

    const transaction = new Transaction(customerOne, customerTwo, value)
    this.enqueueTransaction(transaction)
  }

  static enqueueTransaction(transaction: Transaction): void {}
}
