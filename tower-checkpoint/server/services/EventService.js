import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {

  async create(body) {
    const event = await dbContext.TowerEvents.create(body)
    await event.populate('creator', 'name picture')
    return event
  }

  async getAll() {
    const events = await dbContext.TowerEvents.find().sort({ createdAt: -1 }).populate('creator', 'name picture')
    return events
  }

  async getById(id) {
    const event = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('no event by that id')
    }
    return event
  }

  async editEvent(id, eventData, userId) {
    const event = await this.getById(id)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('Not Yours')
    }

    if (event.isCanceled == true) {
      throw new Forbidden("Cannot edit Canceled Event")

    }

    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate

    await event.save()
    return event
  }

  async delete(id, userId) {
    const event = await this.getById(id)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden("Unauthorized Delete Request")
    }
    event.isCanceled = true
    await event.save()
    // return `event ${event.name} has been deleted`
  }
}
// let res = await server.put(`api/cars/${carData.id}`, carData)
// let car = new Car(res.data)

export const eventsService = new EventsService()