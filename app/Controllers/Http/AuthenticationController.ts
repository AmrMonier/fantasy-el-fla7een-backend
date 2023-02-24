import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import SignupValidator from 'App/Validators/Auth/SignupValidator'

export default class AuthenticationController {
  public async signup({ request, auth, response }: HttpContextContract) {
    const { name, password, username } = await request.validate(SignupValidator)
    const user = await User.create({ name, password, username })
    const token = await auth.login(user)
    return response.ok({
      user,
      token,
    })
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { identifier, password } = await request.validate(LoginValidator)
    try {
      const token = await auth.attempt(identifier, password)
      return response.ok({ user: auth.user, token })
    } catch (error) {
      throw new Exception('Invalid username or password', 401)
    }
  }
}
