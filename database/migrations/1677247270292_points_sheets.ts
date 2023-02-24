import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Position from 'App/Models/Position'

export default class extends BaseSchema {
  protected tableName = 'points_sheets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('position_id')
      table.float('goal')
      table.float('assest')
      table.float('saves')
      table.float('win_bonus')
      table
        .foreign('position_id')
        .references('id')
        .inTable(Position.table)
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
