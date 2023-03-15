import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlayerValidator from 'App/Validators/Player/CreatePlayerValidator'
import UpdatePlayerValidator from 'App/Validators/Player/UpdatePlayerValidator'
import Player from 'App/Models/Player'

export default class PlayersController {
  public async index() {
    const players = await Player.all()
    return players
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePlayerValidator)

    const player = await Player.create(data)

    return response.created(player)
  }

  public async show({ params, response }: HttpContextContract) {
    if (Number.isNaN(+params.id)) return response.notFound({ message: 'Player not found' })

    const player = await Player.find(params.id)

    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    return player
  }

  public async update({ params, request, response }: HttpContextContract) {
    if (Number.isNaN(+params.id)) return response.notFound({ message: 'Player not found' })

    const data = await request.validate(UpdatePlayerValidator)

    const player = await Player.find(params.id)

    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    player.merge(data)
    await player.save()

    return player
  }

  public async destroy({ params, response }: HttpContextContract) {
    if (Number.isNaN(+params.id)) return response.notFound({ message: 'Player not found' })
    const player = await Player.find(params.id)

    if (!player) {
      return response.notFound({ message: 'Player not found' })
    }

    await player.delete()

    return response.noContent()
  }
}
