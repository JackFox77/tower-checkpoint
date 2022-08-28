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
</template>

<script>
import { popperOffsets } from '@popperjs/core'
import { computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}



async function getTicketsById() {
  try {

  } catch (error) {
    logger.error('[getting tickets]', error)
    Pop.error(error)
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
