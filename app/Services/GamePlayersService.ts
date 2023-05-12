import BadRequestException from 'App/Exceptions/BadRequestException'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import GamePlayer from 'App/Models/GamePlayer'
import GameWeek from 'App/Models/GameWeek'
import Player from 'App/Models/Player'
import PointsSheet from 'App/Models/PointsSheet'

export default class GamePlayerService {
  /**
   *
   * @param gameWeekId
   * @param players
   */
  public async createMany(gameWeekId: number, players: { player_id: number; team: string }[]) {
    if (Number.isNaN(gameWeekId)) throw new ResourceNotFoundException('Game Week not found')
    const gameWeek = await GameWeek.query()
      .where('id', gameWeekId)
      .preload('gamePlayers')
      .firstOrFail()
    const teamAPlayer =
      players.filter((player) => player.team === 'A').length +
      gameWeek.gamePlayers.filter((p) => p.team === 'A').length
    const teamBPlayer =
      players.filter((player) => player.team === 'B').length +
      gameWeek.gamePlayers.filter((p) => p.team === 'B').length
    if (teamAPlayer >= gameWeek.teamSize || teamBPlayer >= gameWeek.teamSize)
      throw new BadRequestException(`Team can't be more than ${gameWeek.teamSize}`)
    await gameWeek.related('gamePlayers').createMany(players)
  }

  public async addPlayersPoints(
    gameWeekId: number,
    players: {
      player_id: number
      goals?: number
      assists?: number
      saves?: number
      penalty_saves?: number
    }[],
    totalGoals: number,
    winningTeam?: 'A' | 'B'
  ) {
    const pointsSheets = await PointsSheet.all()
    const sheetsLookUp: { [key: string]: PointsSheet } = {}
    pointsSheets.forEach((sheet) => {
      sheetsLookUp[sheet.position] = sheet
    })
    const goalsCount = players.reduce((sum, player) => sum + (player.goals ?? 0), 0)
    const assistsCount = players.reduce((sum, player) => sum + (player.assists ?? 0), 0)
    if (goalsCount !== totalGoals || assistsCount > totalGoals)
      throw new BadRequestException("Goals or assists counts doesn't match")
    return Promise.all(
      players.map(async (p) => {
        const gamePlayer = await GamePlayer.query()
          .where('player_id', p.player_id)
          .where('game_week_id', gameWeekId)
          .preload('player')
          .firstOrFail()
        const playerSheet = sheetsLookUp[gamePlayer.player.position]
        gamePlayer.goals = p.goals || 0
        gamePlayer.goalsPoints = gamePlayer.goals * playerSheet.goal
        gamePlayer.assists = p.assists || 0
        gamePlayer.assistsPoints = gamePlayer.assists * playerSheet.assist || 0
        gamePlayer.saves = p.saves || 0
        gamePlayer.savesPoints = gamePlayer.saves * playerSheet.blocks || 0
        gamePlayer.penaltySaves = p.penalty_saves || 0
        gamePlayer.penaltySavesPoints = gamePlayer.penaltySaves * playerSheet.penaltySave || 0
        gamePlayer.winBonus = gamePlayer.team === winningTeam ? playerSheet.winBonus : 0
        gamePlayer.total =
          gamePlayer.goalsPoints +
          gamePlayer.assistsPoints +
          gamePlayer.savesPoints +
          gamePlayer.penaltySavesPoints +
          gamePlayer.winBonus
        return gamePlayer.save()
      })
    )
  }
}
