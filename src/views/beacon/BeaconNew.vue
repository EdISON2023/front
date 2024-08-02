<template>
    <Navegation />
  
    <div class="content">
      <Nav />
      <div class="form-container">
        <form @submit.prevent="submitForm" class="form">
          <br>
          <div class="titulo"><h1>Crear Nuevo Beacon</h1></div>
          <br>
          <div class="form-group">
            <label for="uuid" class="form-label">UUID <span class="required">*</span>:</label>
            <input type="text" id="uuid" v-model="form.uuid" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="fechaCreacion" class="form-label">Fecha de Creación <span class="required">*</span>:</label>
            <input type="date" id="fechaCreacion" v-model="form.fechaCreacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="latitud" class="form-label">Latitud <span class="required">*</span>:</label>
            <input type="number" id="latitud" v-model="form.latitud" class="form-control" required step="any">
          </div>
          <div class="form-group">
            <label for="longitud" class="form-label">Longitud <span class="required">*</span>:</label>
            <input type="number" id="longitud" v-model="form.longitud" class="form-control" required step="any">
          </div>
          <div class="form-group">
            <label for="ultimaActualizacion" class="form-label">Última Actualización <span class="required">*</span>:</label>
            <input type="datetime-local" id="ultimaActualizacion" v-model="form.ultimaActualizacion" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado" class="form-label">Estado <span class="required">*</span>:</label>
            <input type="text" id="estado" v-model="form.estado" class="form-control" required>
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
    name: 'BeaconNew',
    components: {
      Navegation,
      Nav
    },
    data() {
      return {
        form: {
          uuid: '',
          fechaCreacion: '',
          latitud: '',
          longitud: '',
          ultimaActualizacion: '',
          estado: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          // Enviar los datos del formulario al backend
          const response = await axios.post('http://localhost:4200/beacon', this.form);
  
          // Mostrar mensaje de éxito
          Swal.fire({
            title: 'Beacon Creado',
            text: 'El beacon ha sido creado exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
          // Limpiar el formulario
          this.form = {
            uuid: '',
            fechaCreacion: '',
            latitud: '',
            longitud: '',
            ultimaActualizacion: '',
            estado: ''
          };
  
          // Redirigir a otra página si es necesario
          // this.$router.push('/ruta-a-donde-redirigir');
        } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al crear el beacon.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error al crear el beacon:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped src="@/assets/styles/beacon/beaconNew.css"></style>
  