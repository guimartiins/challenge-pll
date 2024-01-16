import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({ tableName: 'customers' })
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare cpf: string

  @Column
  declare balance: number

  @Column({ allowNull: false })
  declare numberAccount: string
}
