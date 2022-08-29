import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentService {


    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('[created comment]', res.data)
        AppState.comments.push(res.data)
    }

    async getCommentsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('getting comments', res.data)
        AppState.comments = res.data
    }

    async deleteComment(id) {
        const res = await api.delete(`api/comments/${id}`)
        logger.log(res.data)
        AppState.comments = AppState.comments.filter(c => c.id != id)
        // logger.log(res.data)
    }
}
//   async deleteTicket(ticketId) {
//     const res = await api.delete(`api/tickets/${ticketId}`)
//     AppState.accounttickets = AppState.accounttickets.filter(t => t.id != ticketId)
// }

//   async removeCollab(collabId){
//     const res = await api.delete('api/collaborators/' + collabId)
//     logger.log('REMOVE COLLAB', res.data)
//     // NOTE you only have to filter these both if you have multiple deletes for collab
//     AppState.collaboratorProfiles = AppState.collaboratorProfiles.filter(c => c.id != collabId)
//     AppState.collaboratorAlbums = AppState.collaboratorAlbums.filter(c => c.id != collabId)
// }



export const commentService = new CommentService()