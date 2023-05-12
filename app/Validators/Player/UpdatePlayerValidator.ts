import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdatePlayerValidator {
  public schema = schema.create({
    name: schema.string.optional({}, [rules.maxLength(255)]),
    position: schema.enum.optional(['striker', 'midfielder', 'defender', 'goalkeeper']),
    price: schema.number.optional([rules.range(1, 999999)]),
    active: schema.boolean.optional(),
  })

  public messages = {
    'name.maxLength': 'Name should not be more than 255 characters',
    'position.enum': 'Invalid player position',
    'price.range': 'Invalid price range',
  }
}
