<template>

  <base-card>
  <coach-form @newCoach1="newCoach2"/>
  </base-card>

</template>


<!------------------------------------------------------------------------------------------------------->

<script>
import coachForm from './coachForm.vue'
export default {
  components:{
    coachForm
  },

  methods:{
    newCoach2(coach){
      this.$store.dispatch('coaches/newCoach3', coach)
      this.$store.dispatch('userIdApp',coach.id)
      
      this.$router.replace('/coaches')    //Redirigir a pag principal
    }
  }
}
</script>



<!------------------------------------------------------------------------------------------------------->

