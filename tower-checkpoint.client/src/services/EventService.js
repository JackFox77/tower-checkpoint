import { AppState } from "../AppState"
import { router } from "../router"
// import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventsService {
    async getEvents() {
        const res = await api.get('api/events')
        logger.log('get events')
        AppState.events = res.data
    }

    async getById(id) {
        const res = await api.get('api/events/' + id)
        logger.log('[get event by id]', res.data)
        AppState.activeEvent = res.data
        logger.log(AppState.activeEvent, 'this is the active event')


    }

    async createEvent(newEvent) {
        const res = await api.post('api/events', newEvent)
        logger.log('[created album]', res.data)
        AppState.events.unshift(res.data)
        router.push({
            name: 'EventDetails',
            params: {
                eventId: res.data.id
            }
        })
    }

    async deleteEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        AppState.events = AppState.events.filter(e => e.id != eventId)
        logger.log(res)

    }

}



export const eventsService = new EventsService()