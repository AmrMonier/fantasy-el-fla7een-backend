import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PointsSheet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    columnName: 'position',
    serialize: (value: string) => value.toLowerCase(),
    consume: (value: string) => value.toLowerCase(),
  })
  public position: 'goalkeeper' | 'defender' | 'midfielder' | 'striker'

  @column()
  public goal: number

  @column()
  public assist: number

  @column({ columnName: 'save' })
  public blocks: number

  @column({ columnName: 'clean_sheet' })
  public cleanSheet: number

  @column({ columnName: 'penalty_save' })
  public penaltySave: number

  @column({ columnName: 'win_bonus' })
  public winBonus: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
