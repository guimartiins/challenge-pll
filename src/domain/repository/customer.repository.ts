import type Customer from '../entity/customer'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export default interface CustomerRepositoryInterface {
  getCustomersForTransferenceByNumberAccounts: (
    payerNumberAccount: string,
    receiverNumberAccount: string,
  ) => Promise<Customer[]>
}
