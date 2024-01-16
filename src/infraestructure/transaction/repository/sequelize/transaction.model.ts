import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import CustomerModel from '../../../customer/repository/sequelize/customer.model'

@Table({ tableName: 'transactions' })
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column
  declare id: number

  @Column
  declare value: number

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare payer_id: string

  @BelongsTo(() => CustomerModel, 'payer_id')
  declare payer: CustomerModel

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare receiver_id: string

  @BelongsTo(() => CustomerModel, 'receiver_id')
  declare receiver: CustomerModel
}
