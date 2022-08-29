<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <!-- <div class="container">
    <div class="row">
      <div class="mx-auto my-3 col-md-10" v-for="p in projects" :key="p.id">
        <ProjectCard :project="p" />
      </div>
    </div>
  </div> -->
  <div v-for="t in tickets" :key="t.id" class="bg-primary col-3 my-3 rounded d-flex">

    {{ t.event?.name }}
    <img class="m-3 rounded" :src="t.event?.coverImg" />
    <button class="justify-self-end btn btn-info" @click="deleteTicket(t.id)">delete</button>
  </div>
</template>

<script>
// import { popperOffsets } from '@popperjs/core'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { ticketService } from '../services/TicketService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {

    const route = useRoute()

    async function getTicketsById() {
      try {
        await ticketService.getMyTickets(route.params.accountId)
      } catch (error) {
        logger.error('[getting tickets]', error)
        Pop.error(error)
      }
    }


    onMounted(() => {
      getTicketsById()
    }

    )
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.accounttickets),


      async deleteTicket(id) {
        try {
          await ticketService.deleteTicket(id)
        } catch (error) {
          Pop.error(error)
        }
      }

    }


  }
}


// // async function getProfileById() {
//   try {
//     await profilesService.getProfileById(route.params.profileId)
//   } catch (error) {
//     logger.error('[GettingProfile]', error)
//     Pop.error(error)
//     router.push({ name: 'Home' })
//   }
// }
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
