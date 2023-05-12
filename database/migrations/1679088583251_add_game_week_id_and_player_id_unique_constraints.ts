import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'game_players'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['game_week_id', 'player_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['game_week_id', 'player_id'])
    })
  }
}
