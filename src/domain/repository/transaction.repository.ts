import type Transaction from '../entity/transaction'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface TransactionRepositoryInterface {
  transfer: (transaction: Transaction) => Promise<void>
}
