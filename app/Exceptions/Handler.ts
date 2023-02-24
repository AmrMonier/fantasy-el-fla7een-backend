/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import Http from 'App/Utils/Http'
import Codes from 'App/Constant/HttpCodes'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any) {
    //response.status(error.status).send(error.message)
    switch (error.name) {
      case 'ValidationException':
        return Http.respond({
          message: error.messages.errors[0].field + ' ' + error.messages.errors[0].message,
          statusCode: Codes.BAD_REQUEST,
          show: true,
        })
      case 'UnauthorizedException':
        return Http.respond({
          message: error.message,
          statusCode: Codes.UNAUTHORIZED,
          show: true,
        })
      case 'ResourceNotFoundException':
        return Http.respond({
          message: error.message,
          statusCode: Codes.NOT_FOUND,
          show: true,
        })
      case 'ConflictException':
        return Http.respond({
          message: error.message,
          statusCode: Codes.CONFLICT,
          show: true,
        })
      case 'ForbiddenException':
        return Http.respond({
          message: error.message,
          statusCode: Codes.FORBIDDEN,
          show: true,
        })
      case 'CustomException':
        return Http.respond({
          message: error.message,
          statusCode: error.status,
          show: true,
        })
      case 'RedirectionException':
        return Http.respond({
          data: { redirect: Number(error.code) },
          message: error.message,
          statusCode: 307, // error.status || 307,
          show: true,
        })
      case 'BadRequestException':
        return Http.respond({
          message: error.message,
          statusCode: Codes.BAD_REQUEST,
          show: true,
        })
      default:
        if (process.env.NODE_ENV === 'production' && error.status === 500) {
          // await Mail.sendEmail('ynabil@eduact.com', 'ERROR 500, Please Check!!', error.stack)
          console.log('Error on Production')
        }
        return Http.respond({
          message:
            process.env.NODE_ENV === 'production' && error.status === 500
              ? 'Oops!! Something went wrong.'
              : error.message,
          statusCode: error.status || Codes.INTERNAL_SERVER_ERROR,
          show: true,
        })
    }
  }
}
