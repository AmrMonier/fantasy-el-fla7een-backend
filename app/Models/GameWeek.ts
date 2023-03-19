import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import GamePlayer from './GamePlayer'
import Player from './Player'

export default class GameWeek extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gameWeekNumber: number

  @column()
  public teamSize: number

  @column()
  public teamBName: string

  @column()
  public teamAName: string

  @column()
  public teamAScore: number

  @column()
  public teamBScore: number

  @column()
  public startDate: DateTime

  @column()
  public location: string

  @column()
  public finished: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => GamePlayer)
  public gamePlayers: HasMany<typeof GamePlayer>
}
