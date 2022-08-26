import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.deleteComment)
    }
    async deleteComment(req, res, next) {
        try {
            const message = await commentService.deleteComment(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentService.create(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}