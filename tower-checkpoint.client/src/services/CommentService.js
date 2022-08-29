import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentService {


    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('[created comment]', res.data)
        AppState.comments.push(res.data)
    }


    async deleteComment(commentId) {
        const res = await api.delete(`api/comments/${commentId}`)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }
}
//   async deleteTicket(ticketId) {
//     const res = await api.delete(`api/tickets/${ticketId}`)
//     AppState.accounttickets = AppState.accounttickets.filter(t => t.id != ticketId)
// }


export const commentService = new CommentService()