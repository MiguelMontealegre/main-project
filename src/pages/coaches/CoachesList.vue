<template>
<div>
    <!--Para Mostrar error de fetch data-->
    <base-dialog title="An error Occurred" @close="handleError" :show="!!error">       <!--ya que error va a ser un string, y en el componente auxiliar 'base-dialog' se esta esperando la props de 'show' de tipo BOOLEANO , entonces si le ponemos doble '!!' va a convertir el contenido de 'error' en booleano ... es decir que en caso de que haya algo en 'error' se va a pasar un true y en caso de que no , se pasara false-->       
        <p>{{error}}</p>                
    </base-dialog>   


    <section>
        <filter-coach @change-filter="setFilter"></filter-coach>
    </section>

    <section>
    <base-card>    
        <div class="controls">
            <base-button mode="outline" @click="fetchData">Refresh</base-button>
            <base-button v-if="!isCoach" link to="/register">Register as Coach</base-button>
        </div>

        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
    
        <ul v-else-if="hasCoaches">
            <coach-item v-for="coach in getCoaches" :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
    </base-card>    
    </section>

</div>
</template>


<!------------------------------------------------------------------------------------------------------->



<script>
import CoachItem from './CoachItem.vue'
import filterCoach from './coachFiltering.vue'
import { mapGetters } from 'vuex'
export default {
    
    components:{
        CoachItem,
        filterCoach
    },
    
    data(){
        return{
            isLoading:false,
            error:null,

            activeFilters:{
                frontend:true,
                backend:true,
                career:true
            },
        }
    },

    mounted(){
        this.fetchData()
    },

    computed:{
        getCoaches(){
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                    return true
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')){
                    return true
                }
                if(this.activeFilters.career && coach.areas.includes('career')){
                    return true
                }
                return false
            })
        },

        hasCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        },

        ...mapGetters('coaches',[                       //Nombre del modulo 
            'isCoach'                                 //Getters
           ]),
        
    },


    methods:{
        setFilter(updatedFilters){
            this.activeFilters = updatedFilters
        },
        async fetchData(){
            this.isLoading = true
            try{
                await this.$store.dispatch('coaches/fetchData')        //Resulta que cuando despachamos una accion asincrona, vuex nos da la posibilidad de hacer algo en el componente despues de que esa accion en el store se haya completado
                this.isLoading = false                                //Para hacer esto simplemente , transformamos esta funion del lado del componente a una 'async', y el 'await' debe ir donde se llama a el 'dispatch' ... El codigo que haya despues de la linea del dispatch va  a ser lo que se haga despues
            }
            catch(error){
                this.error = error.message || 'something went wrong';
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}

</style>