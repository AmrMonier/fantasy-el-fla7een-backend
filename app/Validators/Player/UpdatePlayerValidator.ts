import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Player from 'App/Models/Player'
import Position from 'App/Models/Position'

export default class UpdatePlayerValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    userId: schema.number.optional([
      rules.exists({ table: User.table, column: 'id' }),
      rules.unique({ table: Player.table, column: 'user_id' }),
    ]),
    name: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(30)]),
    price: schema.number.optional([rules.unsigned()]),

    positionId: schema.number.optional([rules.exists({ table: Position.table, column: 'id' })]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'userId.unique': 'is already a player',
    'userId.exists': "doesn't exist",
    'name.requiredIfNotExists': 'or userId must be provided',
    'name.minLength': 'must be at least 3 characters',
    'name.maxLength': 'must be at most 30 characters',
    'price.unsigned': 'must be a positive number',
  }
}
