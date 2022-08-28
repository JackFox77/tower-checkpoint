<template>
  <div class="row bg-dark py-1 px-5 text-light">
    <div class="col-12">
      <h2>Events</h2>
    </div>
    <EventForm />
    <div class="col-12">
      filter <i class="mdi mdi-filter"></i>
    </div>
    <section class=" d-flex justify-content-evenly row">
      <div class="col-2 btn btn-outline-light rounded-pill bg-info" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill bg-info" @click="filterTerm = 'concert'">Concerts</div>
      <div class="col-2 btn btn-outline-light rounded-pill bg-info" @click="filterTerm = 'convention'">Conventions</div>
      <div class="col-2 btn btn-outline-light rounded-pill bg-info" @click="filterTerm = 'sport'">Sports</div>
      <div class="col-2 btn btn-outline-light rounded-pill bg-info" @click="filterTerm = 'digital'">Digital</div>
    </section>
  </div>
  <div class="row">
    <EventCard class="col-3" v-for="e in events" :key="e.id" :event="e" />
  </div>

</template>

<script>
import { onMounted, ref } from "vue";
import { eventsService } from "../services/EventService";
import { logger } from "../utils/Logger";
import EventCard from "../components/EventCard.vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import EventForm from "../components/EventForm.vue";
export default {
  setup() {
    const filterTerm = ref("");
    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        logger.log(error);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      filterTerm,
      // albums: computed(() => AppState.albums.filter(a => filterTerm.value ? a.category == filterTerm.value : true)),
      events: computed(() => AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true)),
      // events: computed(()=> AppState.events)
    };
  },
  components: { EventForm }
}
</script>

