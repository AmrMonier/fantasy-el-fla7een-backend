// app/Models/GamePlayer.ts

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import GameWeek from './GameWeek'
import Player from './Player'

export default class GamePlayer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public gameWeekId: number

  @column()
  public playerId: number

  @column()
  public team: string

  @column()
  public goals: number

  @column()
  public goalsPoints: number

  @column()
  public assists: number

  @column()
  public assistsPoints: number

  @column()
  public saves: number

  @column()
  public savesPoints: number

  @column()
  public penaltySaves: number

  @column()
  public penaltySavesPoints: number

  @column()
  public winBonus: number

  @column()
  public total: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => GameWeek)
  public gameWeek: BelongsTo<typeof GameWeek>

  @belongsTo(() => Player)
  public player: BelongsTo<typeof Player>
}
