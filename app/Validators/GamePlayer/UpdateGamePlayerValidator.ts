import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateGamePlayerValidator {
  public schema = schema.create({
    game_week_id: schema.number([rules.exists({ table: 'game_weeks', column: 'id' })]),
    player_id: schema.number([rules.exists({ table: 'players', column: 'id' })]),
    team: schema.enum.optional(['A', 'B']),
    goals: schema.number.optional(),
    assists: schema.number.optional(),
    saves: schema.number.optional(),
    penalty_saves: schema.number.optional(),
    win_bonus: schema.boolean.optional(),
  })

  public messages = {
    'game_week_id.exists': 'Invalid game week id',
    'player_id.exists': 'Invalid player id',
    'team.enum': 'Invalid team, must be A or B',
  }
}
