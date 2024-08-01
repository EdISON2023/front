<template>
  <Navegation />
<div>
  <Nav />
  <h1>Punto de Interes - Edit</h1>
  <!-- Aquí puedes agregar el resto del contenido de tu vista -->
</div>

</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
name: 'PuntoInteresEdit',
components: {
  Navegation,
  Nav

}
}
</script>

