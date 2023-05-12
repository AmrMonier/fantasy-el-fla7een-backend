// app/Validators/UpdatePointsSheetValidator.ts

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import PointsSheet from 'App/Models/PointsSheet'

export default class UpdatePointsSheetValidator {
  public schema = schema.create({
    position: schema.enum(['goalkeeper', 'defender', 'midfielder', 'striker'] as const, [
      rules.unique({ column: 'position', table: PointsSheet.table }),
    ]),
    goal: schema.number([rules.required(), rules.unsigned()]),
    assist: schema.number([rules.required(), rules.unsigned()]),
    cleanSheet: schema.number([rules.required(), rules.unsigned()]),
    penaltySave: schema.number([rules.required(), rules.unsigned()]),
    winBonus: schema.number([rules.required(), rules.unsigned()]),
    save: schema.number.optional([rules.unsigned()]),
  })

  public static messages = {
    'position': "The position  must be a ['goalkeeper', 'defender', 'midfielder', 'striker'] ",
    'goal.unsigned': 'The goal must be a positive number',
    'assist.unsigned': 'The assist must be a positive number',
    'cleanSheet.unsigned': 'The clean sheet must be a positive number',
    'save.unsigned': 'The save must be a positive number',
    'winBonus.unsigned': 'The win bonus must be a positive number',
    'penaltySave.unsigned': 'The win bonus must be a positive number',
  }
}
