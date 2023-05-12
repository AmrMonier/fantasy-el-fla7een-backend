import { schema } from '@ioc:Adonis/Core/Validator'

export default class LoginValidator {
  public schema = schema.create({
    identifier: schema.string({}, []),
    password: schema.string({}, []),
  })

  public messages = {
    'identifier.required': 'Your identifier is required',
    'password.required': 'The password is required',
  }
}
