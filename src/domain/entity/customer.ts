export default class Customer {
  private readonly _id: string
  private readonly _name: string
  private readonly _cpf: string
  private _balance: number
  private readonly _numberAccount: string

  constructor(
    id: string,
    name: string,
    cpf: string,
    balance: number,
    numberAccount: string,
  ) {
    this._id = id
    this._name = name
    this._cpf = cpf
    this._balance = balance
    this._numberAccount = numberAccount
  }

  get id(): string {
    return this._id
  }

  get balance(): number {
    return this._balance
  }

  get name(): string {
    return this._name
  }

  get cpf(): string {
    return this._cpf
  }

  get numberAccount(): string {
    return this._numberAccount
  }

  subtractBalance(value: number): void {
    if (this._balance < value) {
      throw new Error('Customer has no balance')
    }

    this._balance -= value
  }

  addBalance(value: number): void {
    this._balance += value
  }
}
