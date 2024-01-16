export default class Customer {
  private readonly _id: string
  private readonly _name: string
  private readonly _cpf: string
  private _balance: number
  private readonly _numberAccount: number

  constructor(
    id: string,
    name: string,
    cpf: string,
    balance: number,
    numberAccount: number,
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

  get numberAccount(): number {
    return this._numberAccount
  }

  subtractBalance(value: number): void {
    this._balance -= value
  }

  addBalance(value: number): void {
    this._balance += value
  }
}
