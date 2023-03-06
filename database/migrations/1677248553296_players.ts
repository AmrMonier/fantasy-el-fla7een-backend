import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Position from 'App/Models/Position'
import User from 'App/Models/User'

export default class extends BaseSchema {
  protected tableName = 'players'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.float('price')
      table.integer('total_points').defaultTo(0)
      table.integer('user_id').nullable().unique()
      table.integer('position_id')
      table.boolean('is_active').defaultTo(true)

      table
        .foreign('user_id')
        .references('id')
        .inTable(User.table)
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table
        .foreign('position_id')
        .references('id')
        .inTable(Position.table)
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
