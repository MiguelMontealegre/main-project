<template>
  <div class="card">
    <slot></slot>      <!--Ya sabemos que donde estan las etiquetas 'slot' el contenido de otros compoenentes se pondra ahi-->
  </div>               <!--La ventaja de hacer esto es que el estilo es muy reusable, ya que el componente esta registrado de forma global--> 
</template>

<script>
export default {

}
</script>

<style>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>