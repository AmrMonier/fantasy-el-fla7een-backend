import { schema, rules } from '@ioc:Adonis/Core/Validator'
import GamePlayer from 'App/Models/GamePlayer'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateGamePlayerValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    players: schema.array().members(
      schema.object().members({
        player_id: schema.number([
          rules.exists({ table: 'players', column: 'id' }),
          rules.unique({
            table: GamePlayer.table,
            column: 'player_id',
            where: {
              game_week_id: this.ctx.params.weekId,
            },
          }),
        ]),
        team: schema.enum(['A', 'B']),
      })
    ),
  })

  public messages = {
    'game_week_id.exists': 'Invalid game week id',
    'players.*.player_id.exists': 'Invalid player id',
    'team.enum': 'Invalid team, must be A or B',
  }
}
