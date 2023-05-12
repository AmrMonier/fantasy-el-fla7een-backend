import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GameWeeks extends BaseSchema {
  protected tableName = 'game_weeks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('league_id')
      table.increments('week_number', { primaryKey: false }).notNullable()
      table.integer('team_size').notNullable()
      table.string('team_a_name').notNullable()
      table.string('team_b_name').notNullable()
      table.integer('team_a_score').defaultTo(0).notNullable()
      table.integer('team_b_score').defaultTo(0).notNullable()
      table.timestamp('start_date')
      table.string('location')
      table.boolean('finished').defaultTo(false).notNullable()
      table.timestamps(true)
      table.foreign('league_id').references('id').inTable('leagues').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
