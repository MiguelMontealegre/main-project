<template>
  <form @submit.prevent="submit">

  <div class="form-control" :class="{invalid : !firstName.isValid}">
    <label for="firstname">First name</label>
    <input type="text" v-model.trim="firstName.value" @blur="clearValidity('firstName')">    <!--recordando el evento '@blur' lo estamos usando para limpiar las clases de validacion cuando se desenfoque el input-->
    <p v-if="!firstName.isValid">This must not be empty</p>
  </div>

  <div class="form-control" :class="{invalid : !lastName.isValid}">
    <label for="lastname">Last name</label>
    <input type="text" v-model.trim="lastName.value" @blur="clearValidity('lastName')">
    <p v-if="!lastName.isValid">This must not be empty</p>
  </div>

  <div class="form-control" :class="{invalid : !areas.isValid}">
    <h2>habilidades</h2>   
    <label for="frontend">Frontend</label>
    <input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @blur="clearValidity('areas')">
    <label for="backend">Backend</label>
    <input type="checkbox" id="backend" value="backend" v-model="areas.value" @blur="clearValidity('areas')">
    <label for="career">career</label>
    <input type="checkbox" id="career" value="career" v-model="areas.value" @blur="clearValidity('areas')">
    <p v-if="!areas.isValid">This must not be empty</p>
  </div>

  <div class="form-control" :class="{invalid : !description.isValid}">
    <label for="description">Description</label>
    <textarea id="description" rows="5" v-model.trim="description.value" @blur="clearValidity('description')"></textarea>
    <p v-if="!description.isValid">This must not be empty</p>
  </div>

  <div class="form-control" :class="{invalid : !hourlyRate.isValid}">
    <label for="rate">Hourly rate</label>
    <input type="number" v-model.number="hourlyRate.value" @blur="clearValidity('hourlyRate')">
    <p v-if="!hourlyRate.isValid">This must not be empty</p>
  </div>

  <p v-if="!formIsValid" class="invalid">Please fix the errors and submit gain</p>

    <button>done</button>
    </form>
  
</template>



<!------------------------------------------------------------------------------------------------------->


<script>
export default {

    emits:['newCoach1'],

  data(){
    return{
        id:null,
        firstName:{
           value:'',
           isValid:true
        },
        lastName:{
           value:'',
           isValid:true
        },
        areas:{
           value:[],
           isValid:true
        },
        description:{
           value:'',
           isValid:true
        },
        hourlyRate:{
           value:null,
           isValid:true
        },

        formIsValid:true,
    }
  },

  methods:{

    validateForm(){
      this.formIsValid = true
      if(this.firstName.value === ''){
        this.firstName.isValid = false
        this.formIsValid = false
      }
      if(this.lastName.value === ''){
        this.lastName.isValid = false
        this.formIsValid = false
      }
      if(this.description.value === ''){
        this.description.isValid = false
        this.formIsValid = false
      }
      if(!this.hourlyRate.value || this.hourlyRate.value < 0){
        this.hourlyRate.isValid = false
        this.formIsValid = false
      }
      if(this.areas.value.length === 0){
        this.areas.isValid = false
        this.formIsValid = false
      }
    },

    clearValidity(inputRef){
      this[inputRef].isValid = true        //Esta sintaxis de 'this[]' va a alcanzar a el elemento de el componente en ese caso de la data, que tenga el nombre que se ponga dentro de las llaves
    },                                     //Por lo tanto en este caso va a alcanzar(seleccionar) una variable de la data que tenga el mismo nombre que est almacenado en la variable 'inputRef'  ... (firstName, lastName, description, ...)

     submit(){
      this.validateForm()

      if(!this.formIsValid){
        return
      }

      const coach = {
        id:new Date().toISOString(),
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        areas:this.areas.value,
        description: this.description.value,
        hourlyRate:this.hourlyRate.value
      }
   

       //Guardar en vuex  
      this.$emit('newCoach1', coach)


      this.firstName.value = ''
      this.lastName.value = ''
      this.areas.value = []
      this.description.value = ''
      this.hourlyRate.value = null
    }
  }
}
</script>


<!------------------------------------------------------------------------------------------------------->



<style scoped>

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>