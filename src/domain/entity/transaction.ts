import Customer from './customer'

export default class Transaction {
  private readonly _id: number
  private readonly _payer: Customer
  private readonly _receiver: Customer
  private readonly _value: number

  constructor(id: number, payer: Customer, receiver: Customer, value: number) {
    this._id = id
    this._payer = payer
    this._receiver = receiver
    this._value = value
  }

  get id(): number {
    return this._id
  }

  get value(): number {
    return this._value
  }

  get payer(): Customer {
    return this._payer
  }

  get receiver(): Customer {
    return this._receiver
  }
}
