import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventService";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketService";
import { commentService } from "../services/CommentService";





export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/comments', this.getEventComments)
            .get('/:id/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.editEvent)
            .delete('/:id', this.delete)
    }


    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const event = await eventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventTickets(req, res, next) {
        try {
            const tickets = await ticketService.getEventTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const comments = await commentService.getEventComments(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {

        try {
            // let eventData = req.body
            let event = await eventsService.editEvent(req.params.id, req.body, req.userInfo.id)
            res.send(event)

        } catch (error) {
            next(error)
        }

    }

    async delete(req, res, next) {
        try {
            const message = await eventsService.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
} 