<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">

    <label for="frontend">Frontend</label>
    <input id="frontend" type="checkbox" checked @change="setFilter">   <!--EL evento '@change' se genera cuando vue detecta que el valor cambia , en este caso de 'checked' a 'uncheked' o viceverza--->

    <label for="backend">Backend</label>
    <input id="backend" type="checkbox" checked @change="setFilter">

    <label for="career">career</label>
    <input id="career" type="checkbox" checked @change="setFilter">
    </span>
  </base-card>
</template>




<script>
export default {

    emits:['change-filter'],

    data(){
        return{
            filters:{
                frontend:true,
                backend:true,
                career:true
            },
        }
    },
    methods:{
        setFilter(event){       //Caracteristicas internas del evento '@change'
            const inputId = event.target.id
            const isActive = event.target.checked
            
            const updateFilters = {
                ...this.filters,                //Aqui estamos copiando el contenido del objeto 'filters' de nuestro data, es decir todas las propiedades de ese objeto (frontend,backend...) se copiaran en este objeto 
                [inputId]: isActive             //Aqui sobreescribimos un de las propiedades del objeto que copiamos ('filters') , y le ponemos el valor que del checkbox
            }
            this.filters = updateFilters;
            this.$emit('change-filter', updateFilters)
        }
    }
}
</script>








<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>