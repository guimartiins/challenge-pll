import { Sequelize } from 'sequelize-typescript'
import CustomerModel from './customer.model'
import CustomerRepository from './customer.repository'

describe('customer repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  it('should get customers for transference by number accounts', async () => {
    const customerOne = await CustomerModel.create({
      id: '123',
      name: 'John Doe',
      cpf: '12345678900',
      balance: 1000,
      numberAccount: '1234',
    })

    const customerTwo = await CustomerModel.create({
      id: '321',
      name: 'Jane Doe',
      cpf: '09876543211',
      balance: 500,
      numberAccount: '4321',
    })

    const customerRepository = new CustomerRepository(sequelize)

    const customers =
      await customerRepository.getCustomersForTransferenceByNumberAccounts(
        customerOne.numberAccount,
        customerTwo.numberAccount,
      )

    expect(customers).toHaveLength(2)
    expect(customers[0].id).toBe(customerOne.id)
    expect(customers[1].id).toBe(customerTwo.id)
  })

  it('should return empty list if no one customer was found', async () => {
    const customerRepository = new CustomerRepository(sequelize)

    const customers =
      await customerRepository.getCustomersForTransferenceByNumberAccounts(
        '123',
        '321',
      )

    expect(customers).toEqual([])
  })

  it('should return only one customer if the other one does not exist', async () => {
    const customerTwo = await CustomerModel.create({
      id: '321',
      name: 'Jane Doe',
      cpf: '09876543211',
      balance: 500,
      numberAccount: '4321',
    })

    const customerRepository = new CustomerRepository(sequelize)

    const customers =
      await customerRepository.getCustomersForTransferenceByNumberAccounts(
        '123',
        customerTwo.numberAccount,
      )

    expect(customers).toHaveLength(1)
    expect(customers[0].id).toBe(customerTwo.id)
  })
})
