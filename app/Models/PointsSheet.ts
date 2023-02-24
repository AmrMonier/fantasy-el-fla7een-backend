import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

// TODO:: CRUD Module IS MISSING
export default class PointsSheet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public positionId: number

  @column()
  public goal: number

  @column()
  public assest: number

  @column()
  public saves: number

  @column()
  public winBonus: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
