// app/Controllers/Http/PointsSheetController.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResourceNotFoundException from 'App/Exceptions/ResourceNotFoundException'
import PointsSheet from 'App/Models/PointsSheet'
import Http from 'App/Utils/Http'
import CreatePointsSheetValidator from 'App/Validators/PointsSheet/CreatePointsSheetValidator'
import UpdatePointsSheetValidator from 'App/Validators/PointsSheet/UpdatePointsSheetValidator'

export default class PointsSheetController {
  public async index({}: HttpContextContract) {
    const pointsSheets = await PointsSheet.all()
    return Http.respond({ message: 'get all points sheets', data: pointsSheets })
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(CreatePointsSheetValidator)
    const pointsSheet = await PointsSheet.create(data)
    return Http.respond({ message: 'points sheets created', data: pointsSheet })
  }

  public async show({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('points sheet not found')
    const pointsSheet = await PointsSheet.findOrFail(params.id)
    return Http.respond({ message: 'get points sheet', data: pointsSheet })
  }

  public async update({ params, request }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('points sheet not found')

    const data = await request.validate(UpdatePointsSheetValidator)
    const pointsSheet = await PointsSheet.findOrFail(params.id)
    pointsSheet.merge(data)
    await pointsSheet.save()
    return Http.respond({ message: 'points sheet updated', data: pointsSheet })
  }

  public async destroy({ params }: HttpContextContract) {
    if (Number.isNaN(+params.id)) throw new ResourceNotFoundException('points sheet not found')
    const pointsSheet = await PointsSheet.findOrFail(params.id)
    await pointsSheet.delete()
    return Http.respond({ message: 'points sheets deleted', data: pointsSheet })
  }
}
