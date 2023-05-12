// app/Validators/UpdatePointsSheetValidator.ts

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdatePointsSheetValidator {
  public schema = schema.create({
    goal: schema.number.optional([rules.unsigned()]),
    assist: schema.number.optional([rules.unsigned()]),
    cleanSheet: schema.number.optional([rules.unsigned()]),
    penaltySave: schema.number.optional([rules.unsigned()]),
    winBonus: schema.number.optional([rules.unsigned()]),
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
