import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentService {


    async createComment(newComment) {
        const res = await api.post('api/comments', newComment)
        logger.log('[created comment]', res.data)
        AppState.comments.push(res.data)
    }
}


export const commentService = new CommentService()