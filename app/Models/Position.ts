import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { PositionCodes } from 'App/Types/PositionsCodes'
import PointsSheet from './PointsSheet'

// TODO:: CRUD Module IS MISSING
export default class Position extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: PositionCodes
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => PointsSheet)
  public pointsSheet: HasOne<typeof PointsSheet>
}
