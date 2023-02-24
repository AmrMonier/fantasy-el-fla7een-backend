import HttpResponse from 'App/Interfaces/HttpResponse.interface'

import User from 'App/Models/User'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import HttpCodes from 'App/Constant/HttpCodes'

export default class Http {
  public static respond({
    message,
    data = {},
    meta = null,
    filters = null,
    show = false,
    statusCode = HttpCodes.Ok,
  }: HttpResponse) {
    const ctx = HttpContext.get()!
    const responseBody: any = {
      data: data,
      meta: meta,
      message: message,
      filters: filters,
      show: show,
    }
    return ctx.response.status(statusCode).send(responseBody)
  }

  public static sendAuthenticatedRedirectionResponse(
    token: string,
    user: User,
    type: string[],
    message: string
  ) {
    return this.respond({
      data: {
        token: token,
        user: user,
        type: type,
      },
      message,
    })
  }

  public static sendForbiddenRedirectionResponse(redirectionCode: string, message: string) {
    return this.respond({
      data: {
        redirect: redirectionCode,
      },
      message,
      statusCode: HttpCodes.FORBIDDEN,
    })
  }
}
