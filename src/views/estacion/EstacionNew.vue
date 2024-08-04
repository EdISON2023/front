<template>
  <Navegation />

  <div class="content">
    <Nav />
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <br>
        <div class="titulo"><h1>Crear Nueva Estación</h1></div>
        <br>
        <div class="form-group">
          <label for="idEstacion" class="form-label">ID de la Estación <span class="required">*</span>:</label>
          <input type="text" id="idEstacion" v-model="form.idEstacion" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="nombre" class="form-label">Nombre <span class="required">*</span>:</label>
          <input type="text" id="nombre" v-model="form.nombre" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="ubicacion" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacion" v-model="form.ubicacion" class="form-control" required>
        </div> 
        <div class="form-group">
          <label for="capacidad" class="form-label">Capacidad <span class="required">*</span>:</label>
          <input type="number" id="capacidad" v-model="form.capacidad" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="cantidadActual" class="form-label">Cantidad Actual <span class="required">*</span>:</label>
          <input type="number" id="cantidadActual" v-model="form.cantidadActual" class="form-control" required>
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
  name: 'EstacionNew',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        idEstacion: '',
        nombre: '',
        ubicacion: '',
        capacidad: 0,
        cantidadActual: 0,
        estado: ''
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
          idEstacion: '',
          nombre: '',
          ubicacion: '',
          capacidad: 0,
          cantidadActual: 0,
          estado: ''
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


<style scoped src="@/assets/styles/estacion/estacionNew.css"></style>
