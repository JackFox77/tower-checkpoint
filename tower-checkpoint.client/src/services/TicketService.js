import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class TicketService {

    async createTicket(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('[Creating Ticket]', res.data)
        AppState.eventtickets.push(res.data)
    }

    async getTicketByEventId(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.events = res.data
    }


    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.accounttickets = res.data
    }

    async deleteTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        AppState.accounttickets = AppState.accounttickets.filter(t => t.id != ticketId)
    }




    // async create(newCollab) {
    //     const res = await api.post('api/collaborators', newCollab)
    //     logger.log('CREATE COLLAB', res.data)
    //     AppState.collaboratorProfiles.push(res.data)
    // }
}


export const ticketService = new TicketService()