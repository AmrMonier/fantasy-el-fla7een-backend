import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreatePointsSheet extends BaseSchema {
  protected tableName = 'points_sheets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .enum('position', ['goalkeeper', 'defender', 'midfielder', 'striker'])
        .notNullable()
        .unique()
      table.integer('goal').notNullable().defaultTo(0)
      table.integer('assist').notNullable().defaultTo(0)
      table.integer('clean_sheet').notNullable().defaultTo(0)
      table.integer('penalty_save').notNullable().defaultTo(0)
      table.integer('save').notNullable().defaultTo(0)
      table.integer('win_bonus').notNullable().defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
