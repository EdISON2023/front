<template>
  <Navegation />

  <div class="content">
    <Nav />
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <br>
        <div class="titulo"><h1>Crear Nuevo Alquiler</h1></div>
        <br>
        <div class="form-group">
          <label for="fechaEntrega" class="form-label">Fecha de Entrega <span class="required">*</span>:</label>
          <input type="date" id="fechaEntrega" v-model="form.fecha_entrega" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estacionInicio" class="form-label">Estación de Inicio <span class="required">*</span>:</label>
          <input type="text" id="estacionInicio" v-model="form.estacion_inicio" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="fechaRecepcion" class="form-label">Fecha de Recepción <span class="required">*</span>:</label>
          <input type="date" id="fechaRecepcion" v-model="form.fecha_recepcion" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estacionFin" class="form-label">Estación de Fin <span class="required">*</span>:</label>
          <input type="text" id="estacionFin" v-model="form.estacion_fin" class="form-control" required>
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
  name: 'AlquilerView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        fecha_entrega: '',
        estacion_inicio: '',
        fecha_recepcion: '',
        estacion_fin: '',
        estado: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/alquiler', this.form);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Alquiler Creado',
          text: 'El alquiler ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          fecha_entrega: '',
          estacion_inicio: '',
          fecha_recepcion: '',
          estacion_fin: '',
          estado: ''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el alquiler.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear el alquiler:', error);
      }
    }
  }
};
</script>



<style scoped src="@/assets/styles/alquiler/alquilerNew.css"></style>