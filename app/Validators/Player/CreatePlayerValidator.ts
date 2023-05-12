import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreatePlayerValidator {
  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(255)]),
    position: schema.enum(['striker', 'midfielder', 'defender', 'goalkeeper']),
    price: schema.number([rules.range(1, 999999)]),
  })

  public messages = {
    'name.maxLength': 'Name should not be more than 255 characters',
    'position.enum': 'Invalid player position',
    'price.range': 'Invalid price range',
  }
}
