<template>
  <Navegation />
<div>
  <Nav />
  <h1>Mensaje Personalizado - Edit</h1>
  <!-- Aquí puedes agregar el resto del contenido de tu vista -->
</div>

</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
name: 'MensajePersonalizadoEdit',
components: {
  Navegation,
  Nav

}
}
</script>
