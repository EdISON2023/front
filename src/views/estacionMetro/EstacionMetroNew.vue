<template>
  <Navegation />

  <div class="content">
    <Nav />
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <br>
        <div class="titulo"><h1>Crear Nueva Estación </h1></div>
        <br>
        <div class="form-group">
          <label for="nombreEstacion" class="form-label">Nombre de la Estación <span class="required">*</span>:</label>
          <input type="text" id="nombreEstacion" v-model="form.nombreEstacion" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcionEstacion" class="form-label">Capacidad <span class="required">*</span>:</label>
          <input type="text" id="descripcionEstacion" v-model="form.descripcionEstacion" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="ubicacionEstacion" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacionEstacion" v-model="form.ubicacionEstacion" class="form-control" required>
        </div> 
        <div class="form-group">
          <label for="estadoEstacion" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadoEstacion" v-model="form.estadoEstacion" class="form-control" required>
        </div>   

        <div class="form-group-button">
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'EstacionMetroCreate',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        nombreEstacion: '',
        descripcionEstacion: '',
        ubicacionEstacion: '',
        estadoEstacion: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/estacion', this.form);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Estación Creada',
          text: 'La estación ha sido creada exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          nombreEstacion: '',
          descripcionEstacion: '',
          ubicacionEstacion: '',
          estadoEstacion: ""
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear la estación.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear la estación:', error);
      }
    }
  }
};
</script>

<style scoped src="@/assets/styles/estacionMetro/estacionMetroNew.css"></style>
