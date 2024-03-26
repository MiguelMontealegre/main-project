<template>
  <div>
    <section>
      <base-card>
        <h2>{{fullName}}</h2>
        <h3>${{selectedCoach.hourlyRate}}/Hour</h3>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{selectedCoach.description}}</p>
      </base-card>
    </section>


    <section>
      <base-card>
        <header id="scrollRef">
          <h2>Interested? Reach Out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <!--Desplegar ruta anidada-->
        <router-view></router-view>
      </base-card>
    </section>

    
  </div>
</template>



<!------------------------------------------------------------------------------------------------------->


<script>
export default {
  props:['id'],      //El id proviene de routing props

  data(){
    return{
      selectedCoach:null
    }
  },

  created(){
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id == this.id)
  },

  computed:{
    fullName(){
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },

    //Contruir ruta hacia contacto de coach
    contactLink(){
      return this.$route.path + '/' + 'contact'
    }
  }
}
</script>


<!------------------------------------------------------------------------------------------------------->



<style>

</style>