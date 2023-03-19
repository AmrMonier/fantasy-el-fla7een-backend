import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import GameWeek from 'App/Models/GameWeek'
import Http from 'App/Utils/Http'
import CreateGameWeekValidator from 'App/Validators/GameWeek/CreateGameWeekValidator'
import UpdateGameWeekValidator from 'App/Validators/GameWeek/UpdateGameWeekValidator'

export default class GameWeekController {
  public async index({}: HttpContextContract) {
    const gameWeeks = await GameWeek.query().orderBy('id', 'desc')
    return Http.respond({ message: 'get all game week', data: gameWeeks })
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreateGameWeekValidator)
    const gameWeek = await GameWeek.create(data)
    return Http.respond({ message: 'Create game week', data: gameWeek })
  }

  public async show({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Game week not found')
    const gameWeek = await GameWeek.findOrFail(params.id)
    return Http.respond({ message: 'get game week', data: gameWeek })
  }

  public async update({ params, request, response }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Game week not found')
    const data = await request.validate(UpdateGameWeekValidator)
    const gameWeek = await GameWeek.findOrFail(params.id)
    if (gameWeek.finished) return response.forbidden({ message: "Game week can't be updated" })
    gameWeek.merge(data)
    await gameWeek.save()
    return Http.respond({ message: 'update game week', data: gameWeek })
  }

  public async destroy({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Game week not found')

    const gameWeek = await GameWeek.findOrFail(params.id)
    if (gameWeek.finished) throw new ForbiddenException("Game week can't be deleted")
    await gameWeek.delete()
    return Http.respond({ message: 'delete game week', data: gameWeek })
  }
}
