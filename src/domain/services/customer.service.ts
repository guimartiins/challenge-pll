import type Customer from '../entity/customer'

export default class CustomerService {
  static transferBalanceBetweenAccounts(
    customerOne: Customer,
    customerTwo: Customer,
    value: number,
  ): void {
    customerOne.subtractBalance(value)
    customerTwo.addBalance(value)
  }
}
