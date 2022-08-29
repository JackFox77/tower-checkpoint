import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"





class CommentService {
    async deleteComment(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden("'You can't delete that")
        }
        const towerEvent = await dbContext.TowerEvents.findById(comment.eventId)

        await towerEvent.save()
        await comment.delete()
        return comment
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')

        return comments


        //   async remove(collabId, userId) {
        //             const collab = await dbContext.Collaborators.findById(collabId)
        //             if (!collab) {
        //                 throw new BadRequest('no collab at that id')
        //             }
        //             if (collab.accountId.toString() != userId) {
        //                 throw new Forbidden('You can not remove that')
        //             }
        //             await collab.remove()
        //             return 'collab ended'
        //         }


        //  async getEventTickets(eventId) {
        //     const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        //         .populate('event')
        //     return tickets
        // }
    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        return comment
    }


    async getCommentById(commentId) {
        let comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new Forbidden('Invalid Comment Id')
        }
        return comment
    }
}




export const commentService = new CommentService()