import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GamePlayer from 'App/Models/GamePlayer'
import GameWeek from 'App/Models/GameWeek'
import CreateGamePlayerValidator from 'App/Validators/GamePlayer/CreateGamePlayerValidator'
import UpdateGamePlayerValidator from 'App/Validators/GamePlayer/UpdateGamePlayerValidator'
import GamePlayerService from 'App/Services/GamePlayersService'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import Http from 'App/Utils/Http'

export default class GamePlayersController {
  private gamePlayerService = new GamePlayerService()
  public async index({ params }: HttpContextContract) {
    if (Number.isNaN(params.weekId)) throw new ResourceNotFoundException('Game Week not found')
    const gamePlayers = await GameWeek.query()
      .where('id', params.weekId)
      .preload('gamePlayers', (query) => {
        query
          .select(['id', 'player_id', 'team', 'goals', 'assists', 'saves'])
          .preload('player', (query) => {
            query.select(['id', 'name'])
          })
      })
      .firstOrFail()
    return Http.respond({ message: 'get game players', data: gamePlayers })
  }

  public async store({ request, params }: HttpContextContract) {
    const { players } = await request.validate(CreateGamePlayerValidator)
    await this.gamePlayerService.createMany(params.weekId, players)
    Http.respond({ message: 'Players added successfully' })
  }

  public async show({ params }: HttpContextContract) {
    if (Number.isNaN(params.weekId)) throw new ResourceNotFoundException('Game Week not found')
    if (Number.isNaN(params.playerId)) throw new ResourceNotFoundException('Player not found')

    const gamePlayer = await GamePlayer.query()
      .where('game_week_id', params.weekId)
      .where('player_id', params.playerId)
      .preload('player')
      .preload('gameWeek')
      .first()
    Http.respond({ message: 'show Game player', data: gamePlayer })
  }

  public async update({ request, params }: HttpContextContract) {
    if (Number.isNaN(params.weekId)) throw new ResourceNotFoundException('Game Week not found')
    if (Number.isNaN(params.playerId)) throw new ResourceNotFoundException('Player not found')
    const data = await request.validate(UpdateGamePlayerValidator)
    const gamePlayer = await GamePlayer.query()
      .where('player_id', data.player_id)
      .where('game_week_id', data.game_week_id)
      .first()
    if (!gamePlayer) throw new ResourceNotFoundException('Resource not found')
    gamePlayer.merge(data)
    await gamePlayer.save()
    Http.respond({ message: 'update Game player', data: gamePlayer })
  }

  public async destroy({ params }: HttpContextContract) {
    if (Number.isNaN(params.weekId)) throw new ResourceNotFoundException('Game Week not found')
    if (Number.isNaN(params.playerId)) throw new ResourceNotFoundException('Player not found')
    const gamePlayer = await GamePlayer.query()
      .where('player_id', params.player_id)
      .where('game_week_id', params.game_week_id)
      .firstOrFail()
    await gamePlayer.delete()
    Http.respond({ message: 'Delete Game player', data: gamePlayer })
  }
}
