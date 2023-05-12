/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('signup', 'AuthenticationController.signup')
  Route.post('login', 'AuthenticationController.login')
}).prefix('auth')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'PlayersController.index')
    Route.post('/', 'PlayersController.store')
    Route.get('/:id', 'PlayersController.show')
    Route.patch('/:id', 'PlayersController.update')
    Route.delete('/:id', 'PlayersController.destroy')
  }).prefix('api/players')

  Route.group(() => {
    Route.get('', 'GameWeeksController.index')
    Route.get('/:id', 'GameWeeksController.show')
    Route.post('', 'GameWeeksController.store')
    Route.patch('/:id', 'GameWeeksController.update')
    Route.delete('/:id', 'GameWeeksController.destroy')
    Route.post('/:id/submit-score', 'GameWeeksController.submitScores')

    Route.group(() => {
      Route.post('', 'GamePlayersController.store')
      Route.get('', 'GamePlayersController.index')
      Route.get('/:playerId', 'GamePlayersController.show')
      Route.patch('/:playerId', 'GamePlayersController.update')
      Route.delete('/:playerId', 'GamePlayersController.destroy')
    }).prefix('/:weekId/players')
  }).prefix('api/game-weeks')

  Route.group(() => {
    Route.get('/', 'PointsSheetController.index')
    Route.post('/', 'PointsSheetController.store')
    Route.get('/:id', 'PointsSheetController.show')
    Route.patch('/:id', 'PointsSheetController.update')
    Route.delete('/:id', 'PointsSheetController.destroy')
  }).prefix('/api/points-sheet')
}).middleware(['auth', 'is-admin'])
