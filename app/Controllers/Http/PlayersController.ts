import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import Player from 'App/Models/Player'
import User from 'App/Models/User'
import Http from 'App/Utils/Http'
import CreatePlayerValidator from 'App/Validators/Player/CreatePlayerValidator'
import UpdatePlayerValidator from 'App/Validators/Player/UpdatePlayerValidator'

export default class PlayersController {
  public async index({}: HttpContextContract) {
    const players = await Player.query().preload('positionInfo').preload('user').select()

    return Http.respond({ message: 'get all players', data: players })
  }

  public async create({ request }: HttpContextContract) {
    const { name, price, userId, positionId } = await request.validate(CreatePlayerValidator)
    const user = userId ? await User.find(userId) : null
    const player = await Player.create({
      price,
      name: name ? name : user?.name,
      userId,
      positionId,
    })
    await player.load('positionInfo')
    if (user) await player.load('user')
    return Http.respond({ message: 'player created', data: player })
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    if (!Number.isInteger(+id)) throw new ResourceNotFoundException()
    const player = await Player.query()
      .where('id', id)
      .preload('user')
      .preload('positionInfo')
      .firstOrFail()
    return Http.respond({ message: 'get player by id', data: player })
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params
    if (!Number.isInteger(+id)) throw new ResourceNotFoundException()
    const player = await Player.query()
      .where('id', id)
      .preload('user')
      .preload('positionInfo')
      .firstOrFail()
    const { name, price, userId, positionId } = await request.validate(UpdatePlayerValidator)
    const user = userId ? await User.find(userId) : null
    player.merge({
      price,
      name: name ? name : user?.name,
      userId,
      positionId,
    })
    await player.save()
    await player.refresh()
    return Http.respond({ message: 'player Updated', data: player })
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    if (!Number.isInteger(+id)) throw new ResourceNotFoundException()
    const player = await Player.query().where('id', id).firstOrFail()
    player.isActive = false
    await player.save()
    return Http.respond({ message: 'player deactivated' })
  }
}
