<template>
  <form @submit.prevent="submit">
   <div>
      <label for="email">Email</label>
      <input id="email" type="email" v-model.trim="email">
   </div>
   <div>
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
   </div>

  <p v-if="!formIsValid" style="color: red;font-weight:bold;">Complete the inputs!</p>

   <div class="actions">
      <base-button>Send Message</base-button>
   </div>

  <transition name="done" mode="out-in">
   <p v-if="done" style="color:green;font-weight:bold;">Message Sent!</p>
  </transition>

  </form>
</template>


<!------------------------------------------------------------------------------------------------------->


<script>
export default {
  data(){
    return{
      email:'',
      message:'',
      formIsValid: true,
      done:false,
    }
  },


  methods:{
  
    submit(){
      this.formIsValid = true
      this.done = false

      //Validar
      if(!this.email || !this.email.includes('@') || !this.message){
        this.formIsValid = false;
        return;
      }

      //New Request
      const newRequest = {
        id: new Date().toISOString(),
        coachId:this.$route.params.id,     //El 'id' del coach al que estamos contactando lo vamos a extraer de la url ... Analizando que esta es una ruta hija entonces vamos a tener disponible en el campo de 'params' ese id dinamico 
        userEmail: this.email,
        message: this.message
      }

    
      this.$store.dispatch('requests/addRequestAction', newRequest)

      //Redirigir
      this.done = true
      setTimeout(()=>{
      if(confirm('Do you wanna stay here?')){
        this.done = false
      }
      else{  
      this.$router.replace('/coaches')  }
      },800)
    }
  },
}
</script>



<!------------------------------------------------------------------------------------------------------->



<style scoped>

.done-enter-from{
  opacity:0;
  transform: translateX(-30px);
}
.done-enter-active{
  transition: all 0.3s ease-out;
}
.done-enter-to{
  opacity:1;
  transform: translateX(0);
}



form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>