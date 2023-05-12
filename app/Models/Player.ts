import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasManyThrough,
  belongsTo,
  column,
  hasMany,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import GamePlayer from './GamePlayer'
import GameWeek from './GameWeek'
import League from './League'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public position: string

  @column()
  public leagueId: number

  @column()
  public price: number

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => GamePlayer)
  public gamesStats: HasMany<typeof GamePlayer>

  @hasManyThrough([() => GameWeek, () => GamePlayer], {
    foreignKey: 'playerId',
    throughForeignKey: 'gameWeekId',
    throughLocalKey: 'id',
    localKey: 'id',
  })
  public players: HasManyThrough<typeof GameWeek>

  @belongsTo(() => League)
  public league: BelongsTo<typeof League>
}
