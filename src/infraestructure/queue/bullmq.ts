import { Queue, Worker } from 'bullmq'
import TransactionRepository from '../transaction/repository/sequelize/transaction.repository'
import { connection } from '../..'
import { type Sequelize } from 'sequelize-typescript'
import Transaction from '../../domain/entity/transaction'
import Customer from '../../domain/entity/customer'

const connectionOptions = {
  connection: {
    host: '0.0.0.0',
    port: 6379,
  },
}

const transactionQueue = new Queue('transaction', connectionOptions)

const transactionWorker = new Worker(
  'transaction',
  async (job) => {
    console.log(`Processing job ${job.id}...`)

    console.log(job.data)
    const transactionRepository = new TransactionRepository(
      connection as Sequelize,
    )
    const payer = new Customer(
      job.data._payer._id as string,
      job.data._payer._name as string,
      job.data._payer._cpf as string,
      job.data._payer._balance as number,
      job.data._payer._numberAccount as string,
    )

    const receiver = new Customer(
      job.data._receiver._id as string,
      job.data._receiver._name as string,
      job.data._receiver._cpf as string,
      job.data._receiver._balance as number,
      job.data._receiver._numberAccount as string,
    )

    const transaction = new Transaction(
      job.data._id as number,
      payer,
      receiver,
      job.data._value as number,
    )

    await transactionRepository.transfer(transaction)
  },
  connectionOptions,
)

transactionWorker.on('completed', (job) => {
  console.log(`${job.id} has completed!`)
})

transactionWorker.on('failed', (job, err) => {
  console.log(`${job?.id} has failed with ${err.message}`)
})

export { transactionQueue, transactionWorker }
