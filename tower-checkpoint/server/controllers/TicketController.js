import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService";
import BaseController from "../utils/BaseController";



export class TicketController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.deleteTicket)
    }
    async deleteTicket(req, res, next) {
        try {
            const message = await ticketService.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketService.create(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}