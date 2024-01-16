import Customer from './customer'

describe('Customer unit tests', () => {
  it('should throw an error if value is greater than balance', () => {
    const customer = new Customer('123', 'John Doe', '12345678910', 50, '123')
    expect(() => {
      customer.subtractBalance(100)
    }).toThrow('Customer has no balance')
  })

  it('should subtract balance', () => {
    const customer = new Customer('123', 'John Doe', '12345678910', 50, '123')

    customer.subtractBalance(10)
    expect(customer.balance).toBe(40)
  })

  it('should add balance', () => {
    const customer = new Customer('123', 'John Doe', '12345678910', 50, '123')

    customer.addBalance(10)
    expect(customer.balance).toBe(60)
  })
})
