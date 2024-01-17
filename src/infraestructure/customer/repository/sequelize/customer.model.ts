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
<<<<<<< HEAD
  declare numberAccount: string
=======
  declare numberAccount: number
>>>>>>> 961df353f36b7c494886dab6503bde4d9a4b0263
}
