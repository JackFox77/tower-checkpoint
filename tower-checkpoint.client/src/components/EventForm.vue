<template>
  <section class="" id="">
    <div>
      <form @submit.prevent="handleSubmit" class="">
        <div>Create Event</div>
        <div>
          <label for="" class="form-label">Name</label>
          <input type="text" v-model="editable.name" class="form-control" name="title" id="title">
        </div>
        <div>
          <label for="" class="form-label">Cover Image</label>
          <input type="url" v-model="editable.coverImg" class="form-control" name="title" id="title">
        </div>
        <div>
          <label for="" class="form-label">Type</label>
          <select v-model="editable.type" name="" id="" class="form-control">
            <option value="concert">Concerts</option>
            <option value="convention">Conventions</option>
            <option value="sport">Sports</option>
            <option value="digital">Digital</option>
          </select>
        </div>
        <div>
          <label for="" class="mt-2 form-label">Location</label>
          <input type="text" class="mx-2" v-model="editable.location">
        </div>
        <div>
          <label for="" class="form-label">Capacity</label>
          <input type="number" class="mx-2" v-model="editable.capacity">
        </div>
        <div>
          <label for="" class="form-label">Start Date</label>
          <input type="date" class="mx-2" v-model="editable.startDate">
        </div>
        <div>
          <label for="" class="form-label">Description</label>
          <input type="text" class="mx-2" v-model="editable.description">
        </div>
        <button class="btn btn-danger">Submit</button>
      </form>
    </div>
  </section>

  <!-- 
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false, required: true },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, },
    creatorId: { type: ObjectId, required: true, ref: 'Account' } -->
</template>


<script>

import { ref } from 'vue';
import { eventsService } from "../services/EventService";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('creating event', editable.value)
          await eventsService.createEvent(editable.value)
          Pop.toast('event created')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>