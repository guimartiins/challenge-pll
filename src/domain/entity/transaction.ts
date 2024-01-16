export default class Transaction {
  private readonly _id: string
  private readonly _payerId: string
  private readonly _receiverId: string
  private readonly _value: number

  constructor(id: string, payerId: string, receiverId: string, value: number) {
    this._id = id
    this._payerId = payerId
    this._receiverId = receiverId
    this._value = value
  }

  get id(): string {
    return this._id
  }

  get value(): number {
    return this._value
  }

  get payerId(): string {
    return this._payerId
  }

  get receiverId(): string {
    return this._receiverId
  }
}
