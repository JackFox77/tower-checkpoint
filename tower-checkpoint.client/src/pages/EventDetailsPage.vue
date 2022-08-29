<template>
  <section class="container-fluid">
    <div class=" row">
      <h4 v-if="event.isCanceled" class=" col-2 rounded m-2 bg-black text-warning">Canceled</h4>
      <h4 v-if="event.capacity == 0" class="text-warning">SOLD OUT</h4>
      <h3 class="col-12">| {{  event?.name  }}</h3>
      <div class="col-3">
        <img class="img-fluid" :src="event?.coverImg" alt="">
      </div>
      <div class="col-9 bg-secondary">
        <span><b>Info</b></span> : {{  event.description  }}
      </div>
      <div>
        <h6>Created By | {{  event.creator?.name  }}</h6>
      </div>
      <div>
        Location | {{  event.location  }}
      </div>
      <div v-if="!event.isCanceled">
        Available Tickets | {{  event.capacity  }}
      </div>
      <div>
        date | {{  new Date(event.startDate)  }}
      </div>
      <div>
        {{  event.type  }}
      </div>
    </div>
    <h1 v-if="event.capacity == 0">Sold Out</h1>
    <button v-if="isCreator" class="btn btn-danger" @click="handleSubmit">Cancel Event</button>

    <button v-if="!hasTicket" class="btn btn-success" @click="handleTicket">Get Tickets</button>
    <section class="row">
      <form @submit.prevent="handleComment">
        <h3>Leave Comment</h3>
        <div>
          <label for=""></label>
          <input class="form-label" type="text" name="" id="" v-model="editable.body">
        </div>
        <button class="btn btn-info">Comment</button>
      </form>

      <div v-for="t in eventtickets" class="rounded col-3">

        <img class="img-fluid rounded-pill " :src="t.profile.picture" :title="t.profile.name">
      </div>

    </section>
    <div class="row">
      <div class="col-6">
        <CommentCard :comment="c" v-for="c in comments" :key="c.id" />
      </div>
    </div>
  </section>





</template>




<script>
import { computed } from '@vue/reactivity';
import { onMounted, popScopeId } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventService';
import { ticketService } from '../services/TicketService';
import Pop from '../utils/Pop';
import { logger } from "../utils/Logger"
import { Account } from '../models/Account';
import { ref } from 'vue';
import { commentService } from '../services/CommentService'
import EventCard from '../components/EventCard.vue';
import CommentCard from '../components/CommentCard.vue';




export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    async function getEventsById() {
      try {
        await eventsService.getById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getComments() {
      try {
        await commentService.getCommentsByEvent(route.params.eventId)
      } catch (error) {
        logger.log('comments', error)
        Pop.error(error)
      }
    }

    async function getTicketsByEvent() {
      try {
        await ticketService.getTicketByEventId(route.params.eventId)
      } catch (error) {
        logger.log('[get ticket from events]')
      }
    }

    onMounted(() => {
      getEventsById();
      getComments();
      getTicketsByEvent()
    });
    return {
      editable,
      eventtickets: computed(() => AppState.eventtickets),
      comments: computed(() => AppState.comments),
      isCreator: computed(() => {
        if (AppState.account.id == AppState.activeEvent.creatorId) {
          return true;
        }
        else {
          return false;
        }
      }),
      isCanceled: computed(() => {
        if (AppState.activeEvent.isCanceled == true) {
          return true;
        }
      }),
      hasTicket: computed(() => {
        if (AppState.eventtickets.find(c => c.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      event: computed(() => AppState.activeEvent),


      async handleTicket() {
        try {
          if (AppState.activeEvent.capacity > 0) {
            let newTicket = {
              eventId: AppState.activeEvent.id,
              accountId: AppState.account.id
            }
            logger.log('got tickets', newTicket)
            await ticketService.createTicket(newTicket)
          }
          else {
            Pop.error('No Tickets Available')
          }
        } catch (error) {
          logger.log('[get tickets]', error)
          Pop.error(error)
        }


      },


      async handleSubmit() {
        try {
          await eventsService.deleteEvent(route.params.eventId);
          Pop.toast("event deleted");
        }
        catch (error) {
          Pop.error(error);
          logger.error(error);
        }
      },
      async handleComment() {
        try {
          editable.value.eventId = route.params.eventId
          await commentService.createComment(editable.value)
          Pop.toast("created comment");
        }
        catch (error) {
          Pop.error(error);
          logger.error(error);
        }

        // async handleSubmit() {
        //   try {
        //     editable.value.albumId = route.params.albumId
        //     await picturesService.create(editable.value)
        //     // NOTE next line clears form
        //     editable.value = {}
        //     Pop.success('picture added')
        //   } catch (error) {
        //     Pop.error(error)
        //   }
      },
    };
  },
  components: { EventCard, CommentCard }
}


</script>