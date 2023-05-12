import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class League extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.date()
  public startDate: DateTime

  @column.date()
  public endDate: DateTime

  @column()
  public isCompleted: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
