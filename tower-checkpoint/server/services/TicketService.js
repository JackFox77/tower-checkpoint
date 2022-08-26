import { dbContext } from "../db/DbContext"




class TicketService {
    async delete(id, userId) {

        const ticket = await dbContext.Tickets.findById(id)
        // @ts-ignore
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        // @ts-ignore
        towerEvent.capacity += 1
        // @ts-ignore
        await towerEvent.save()
        // @ts-ignore
        await ticket.delete()
        // @ts-ignore
        await ticket.save()


        return 'ticket deleted'

    }


    async create(newTicket) {
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('event')
        await ticket.populate('profile', 'name picture')
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        // @ts-ignore
        towerEvent.capacity -= 1
        // @ts-ignore
        await towerEvent.save()


        return ticket
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
            .populate('event')
        return tickets
    }

    async getByAccountId(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId: accountId }).populate('event')
        return tickets
    }



}


export const ticketService = new TicketService()