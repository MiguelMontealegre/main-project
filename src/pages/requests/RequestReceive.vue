<template>

  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>

  <base-card>
     <header>
        <h2>Requests Receive</h2>
     </header>

     <base-spinner v-if="isLoading"></base-spinner>
     
     <ul v-if="hasRequests">
        <request-item v-for="req in getRequests" 
        :key="req.id" 
        :email="req.userEmail" 
        :message="req.message"/>
     </ul>

     <h3 v-else>You havent receive any request yet!</h3> 
  </base-card>
</template>


<!------------------------------------------------------------------------------------------------------->


<script>
import RequestItem from './RequestItem.vue'
export default {
  components:{
    RequestItem
  },

  data(){
    return{
      isLoading:false,
      error:null,
    }
  },

  mounted(){
    this.fetchRequests();
  },

  computed:{
    getRequests(){
     return this.$store.getters['requests/requests']
    },
    hasRequests(){
     return this.$store.getters['requests/hasRequests']
    },
  },


    methods:{
      async fetchRequests(){
        this.isLoading = true
        try{
          this.$store.dispatch('requests/fetchRequests');
          this.isLoading = false;
        }
        catch(error){
          this.error = error;
          this.isLoading = false;
        }
      },

      handleError(){
        this.error = null;
      }
    },
}
</script>


<!------------------------------------------------------------------------------------------------------->


<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>