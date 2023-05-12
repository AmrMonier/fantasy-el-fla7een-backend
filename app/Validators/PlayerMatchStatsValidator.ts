import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Match from 'App/Models/Match'
import Player from 'App/Models/Player'

export default class PlayerMatchStatValidator {
  public schema = schema.create({
    playerId: schema.number([rules.exists({ table: Player.table, column: 'id' })]),
    matchId: schema.number([rules.exists({ table: Match.table, column: 'id' })]),
    goalsScored: schema.number.optional(),
    assists: schema.number.optional(),
    saves: schema.number.optional(),
    bonus: schema.number.optional(),
  })

  public messages = {}
}
