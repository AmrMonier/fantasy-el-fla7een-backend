import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GamePlayers extends BaseSchema {
  protected tableName = 'game_players'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('game_week_id').unsigned().references('game_weeks.id')
      table.integer('player_id').unsigned().references('players.id')
      table.enum('team', ['A', 'B']).notNullable()
      table.integer('goals')
      table.integer('goals_points')
      table.integer('assists')
      table.integer('assists_points')
      table.integer('saves')
      table.integer('saves_points')
      table.integer('penalty_saves')
      table.integer('penalty_saves_points')
      table.integer('win_bonus')
      table.integer('total')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
