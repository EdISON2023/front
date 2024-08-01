<template>
  <Navegation />
<div>
  <Nav />
  <h1>Ruta - New</h1>
  <!-- Aquí puedes agregar el resto del contenido de tu vista -->
</div>

</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
name: 'RutaEdit',
components: {
  Navegation,
  Nav

}
}
</script>

