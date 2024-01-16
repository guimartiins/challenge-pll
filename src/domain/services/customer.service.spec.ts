import Customer from '../entity/customer'
import CustomerService from './customer.service'

describe('Customer Service unit tests', () => {
  it('should throw a error if the customer has no balance', () => {
    const customerOne = new Customer(
      '123',
      'John Doe',
      '12345678910',
      50,
      '123',
    )

    const customerTwo = new Customer(
      '124',
      'Jane Doe',
      '12345678911',
      10,
      '124',
    )

    expect(() => {
      CustomerService.transferBalanceBetweenAccounts(
        customerOne,
        customerTwo,
        100,
      )
    }).toThrow('Customer has no balance')
  })

  it('should transfer money from customer one to customer two', () => {
    const customerOne = new Customer(
      '123',
      'John Doe',
      '12345678910',
      100,
      '123',
    )
    const customerTwo = new Customer(
      '124',
      'Jane Doe',
      '12345678911',
      10,
      '124',
    )

    CustomerService.transferBalanceBetweenAccounts(customerOne, customerTwo, 50)

    expect(customerOne.balance).toBe(50)
    expect(customerTwo.balance).toBe(60)
  })
})
