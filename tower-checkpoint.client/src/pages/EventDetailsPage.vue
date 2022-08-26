<template>
  <section class="container-fluid">
    <div class=" row">
      <h4 v-if="event.isCanceled" class=" col-2 rounded m-2 bg-black text-warning">Canceled</h4>
      <h4 v-if="event.capacity == 0" class="text-warning">SOLD OUT</h4>
      <h3 class="col-12">| {{ event?.name }}</h3>
      <div class="col-3">
        <img class="img-fluid" :src="event?.coverImg" alt="">
      </div>
      <div class="col-9 bg-secondary">
        <span><b>Info</b></span> : {{ event.description }}
      </div>
      <div>
        <h6>Created By | {{ event.creator?.name }}</h6>
      </div>
      <div>
        Location | {{ event.location }}
      </div>
      <div v-if="!event.isCanceled">
        Available Tickets | {{ event.capacity }}
      </div>
      <div>
        date | {{ new Date(event.startDate) }}
      </div>
      <div>
        {{ event.type }}
      </div>
    </div>
    <h1 v-if="event.capacity == 0">Sold Out</h1>
    <button v-if="isCreator" class="btn btn-danger" @click="handleSubmit">Cancel Event</button>

    <button v-if="!hasTicket" class="btn btn-success" @click="handleTicket">Get Tickets</button>



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
import { applyStyles } from '@popperjs/core';




export default {
  setup() {
    const route = useRoute();
    async function getEventsById() {
      try {
        await eventsService.getById(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getEventsById()
    })
    return {
      isCreator: computed(() => {
        if (AppState.account.id == AppState.activeEvent.creatorId) {
          return true

        }
        else {
          return false

        }
      }),
      // isSoldOut: computed(() => {
      //     if (activeEvent.capacity == 0)
      //         return true 
      //     else return false
      // }),
      isCanceled: computed(() => {
        if (AppState.activeEvent.isCanceled == true) { return true }
      }
      ),

      hasTicket: computed(() => {

        if (AppState.tickets.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      event: computed(() => AppState.activeEvent),
      async handleTicket() {
        try {
          await ticketService.createTicket(route.params)
          Pop.toast('got tickets')
        } catch (error) {
          Pop.error(error)
          logger.log(error)
        }

      },
      async handleSubmit() {
        try {
          await eventsService.deleteEvent(route.params.eventId)
          Pop.toast('event deleted')
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      },

    }
  }

}


</script>