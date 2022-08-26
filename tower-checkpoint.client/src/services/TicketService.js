import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class TicketService {

    async createTicket(newTicket) {
        const res = await api.post('api/tickets', newTicket)
        logger.log('[Creating Ticket]', newTicket)
        AppState.tickets.push(res.data)
    }

    async getTicketByEventId() {

    }


    async getMyTickets() {

    }

    async deleteTicket() {

    }




    // async create(newCollab) {
    //     const res = await api.post('api/collaborators', newCollab)
    //     logger.log('CREATE COLLAB', res.data)
    //     AppState.collaboratorProfiles.push(res.data)
    // }
}


export const ticketService = new TicketService()