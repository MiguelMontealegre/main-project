<template>
  <the-header></the-header>
  
  
  <router-view>  
  </router-view>

</template>


<!------------------------------------------------------------------------------------------------------->


<script>
import TheHeader from './layouts/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>



<!------------------------------------------------------------------------------------------------------->


<style>       

.route-enter-from{
  opacity:0;
}
.route-enter-active{
  transition:opacity 1s ease-out;
}
.route-enter-to{
  opacity:1;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
