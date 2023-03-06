import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import SignupValidator from 'App/Validators/Auth/SignupValidator'
import Http from 'App/Utils/Http'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class AuthenticationController {
  public async signup({ request, auth }: HttpContextContract) {
    const { name, password, username } = await request.validate(SignupValidator)
    const user = await User.create({ name, password, username })
    const token = await auth.login(user)
    return Http.respond({ message: 'Account Created Successfully', data: { user, token } })
  }

  public async login({ request, auth }: HttpContextContract) {
    const { identifier, password } = await request.validate(LoginValidator)
    try {
      const token = await auth.attempt(identifier, password)
      return Http.respond({
        message: 'Account Created Successfully',
        data: { user: auth.user, token },
      })
    } catch (error) {
      throw new UnauthorizedException('Wrong username or password')
    }
  }
}
