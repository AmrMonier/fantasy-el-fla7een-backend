import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlayerValidator from 'App/Validators/Player/CreatePlayerValidator'
import UpdatePlayerValidator from 'App/Validators/Player/UpdatePlayerValidator'
import Player from 'App/Models/Player'
import Http from 'App/Utils/Http'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'

export default class PlayersController {
  public async index() {
    const players = await Player.all()

    return Http.respond({ message: 'get players', data: players })
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreatePlayerValidator)

    const player = await Player.create(data)

    return Http.respond({ message: 'player created', data: player })
  }

  public async show({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Player not found')
    const player = await Player.find(params.id)
    if (!player) throw new ResourceNotFoundException('Player not found')
    return Http.respond({ message: 'get player', data: player })
  }

  public async update({ params, request }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Player not found')
    const player = await Player.find(params.id)
    if (!player) throw new ResourceNotFoundException('Player not found')
    const data = await request.validate(UpdatePlayerValidator)
    player.merge(data)
    await player.save()

    return Http.respond({ message: 'player updated', data: player })
  }

  public async destroy({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('Player not found')
    const player = await Player.find(params.id)
    if (!player) throw new ResourceNotFoundException('Player not found')
    await player.delete()
    return Http.respond({ message: 'player deleted', data: player })
  }
}
