import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Players extends BaseSchema {
  protected tableName = 'players'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('league_id')
      table.enum('position', ['striker', 'midfielder', 'defender', 'goalkeeper']).notNullable()
      table.decimal('price').notNullable()
      table.boolean('active').defaultTo(false)
      table.timestamps(true, true)
      table.foreign('league_id').references('id').inTable('leagues').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
