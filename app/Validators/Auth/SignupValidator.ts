import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegisterValidator {
  public schema = schema.create({
    name: schema.string(),
    username: schema.string({}, [
      rules.unique({ table: User.table, column: 'username' }),
      rules.alpha({
        allow: ['dash'],
      }),
    ]),
    phone: schema.string({}, [rules.mobile()]),
    password: schema.string({}, [
      rules.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
      rules.confirmed(),
    ]),
  })

  public messages = {
    'name.required': 'Your name is required',
    'username.alpha': 'The username can only contain letters, dashes, and underscores',
    'username.required': 'The username is required',
    'phone.required': 'Your phone number is required',
    'phone.mobile': 'The phone number must be a valid Egyptian phone number',
    'password.required': 'The password is required',
    'password.regex':
      'The password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    'password_confirmation.required': 'The password confirmation is required',
    'password_confirmation.confirmed': 'The passwords do not match',
  }
}
