import type Customer from '../entity/customer'

export default class CustomerService {
  static transferBalanceBetweenAccounts(
    customerOne: Customer,
    customerTwo: Customer,
    value: number,
  ): void {
    customerOne.subtractBalance(value)
    customerTwo.addBalance(value)
<<<<<<< HEAD
=======

    const transaction = new Transaction(
      '123',
      customerOne.id,
      customerTwo.id,
      value,
    )
    this.enqueueTransaction(transaction)
>>>>>>> 961df353f36b7c494886dab6503bde4d9a4b0263
  }
}
