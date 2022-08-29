
    <template>
    <div class="">
        <img class="img-fluid" :src="comment.creator.picture" alt="">
        <div class="bg-warning">
            <h5>{{ comment.creator.name }}</h5>
            <b>{{ comment.body }}</b>
            <button class="btn mdi mdi-delete-forever" @click="deleteComment(c.id)"></button>
        </div>

    </div>
</template>



<script>
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'



export default {

    props: { comment: { type: Object, required: true } },
    setup() {
        return {


            async deleteComment(commentId) {
                // try {
                //     let commentToRemove = AppState.comments.find(c => c.id == AppState.account.id)
                //     await commentService.deleteComment(commentToRemove.id)
                // } catch (error) {
                //     Pop.error(error)
                // }
                try {
                    await commentService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }


}

</script>