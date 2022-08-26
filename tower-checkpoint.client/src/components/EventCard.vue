<template>
<router-link :to="{name :'EventDetails', params:{eventId:event.id}}">
    <div class="card bg-secondary selectable">
        
        <h3>{{event.name}}</h3>
        <img class="img-fluid" :src="event.coverImg" alt="">
    </div>
    
</router-link>
</template>



<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';


export default {

props:{ event: {type: Object, required:true}},
    setup(props) {
        return {
            
            // goTo() {
            //     router.push({name:'Event', params: {eventId: props.event.id }})
            // }
        }
            }
        
    
}
</script>