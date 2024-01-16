import Transaction from '../../../domain/entity/transaction'
import type CustomerRepositoryInterface from '../../../domain/repository/customer.repository'
import CustomerService from '../../../domain/services/customer.service'
import { transactionQueue } from '../../queue/bullmq'

export default class TransactionController {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async transfer(
    payerNumberAccount: string,
    receiverNumberAccount: string,
    value: number,
  ): Promise<void> {
    const [payer, receiver] =
      await this.customerRepository.getCustomersForTransferenceByNumberAccounts(
        payerNumberAccount,
        receiverNumberAccount,
      )

    CustomerService.transferBalanceBetweenAccounts(payer, receiver, value)
    const transaction = new Transaction(
      Math.floor(Math.random() * (10000 - 1)) + 1,
      payer,
      receiver,
      value,
    )

    await transactionQueue.add('transaction', transaction)
  }
}
