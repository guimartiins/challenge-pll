import type Customer from './customer'

export default class Transaction {
  private readonly _payer: Customer
  private readonly _receiver: Customer
  private readonly _value: number

  constructor(payer: Customer, payee: Customer, value: number) {
    this._payer = payer
    this._receiver = payee
    this._value = value
  }
}
