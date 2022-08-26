import { dbContext } from "../db/DbContext"





class CommentService {
    async deleteComment(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        // @ts-ignore

        await comment.delete()
        // @ts-ignore
        await comment.save()
    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')

        return comments





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

}




export const commentService = new CommentService()