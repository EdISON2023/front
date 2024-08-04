<template>
  <Navegation />

  <div class="content">
    <Nav />
    <div class="form-container">
      <form @submit.prevent="submitForm" class="form">
        <br>
        <div class="titulo"><h1>Crear Nuevo Mantenimiento</h1></div>
        <br>
        <div class="form-group">
          <label for="idMantenimiento" class="form-label">ID Mantenimiento <span class="required">*</span>:</label>
          <input type="text" id="idMantenimiento" v-model="form.idMantenimiento" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="fechaInicio" class="form-label">Fecha de Inicio <span class="required">*</span>:</label>
          <input type="date" id="fechaInicio" v-model="form.fechaInicio" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="fechaFin" class="form-label">Fecha de Fin <span class="required">*</span>:</label>
          <input type="date" id="fechaFin" v-model="form.fechaFin" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcion" class="form-label">Descripción <span class="required">*</span>:</label>
          <input type="text" id="descripcion" v-model="form.descripcion" class="form-control" required>
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
  name: 'MantenimientoNew',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      form: {
        idMantenimiento: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
        estado: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Enviar los datos del formulario al backend
        const response = await axios.post('http://localhost:4200/mantenimiento', this.form);
        
        // Mostrar mensaje de éxito
        Swal.fire({
          title: 'Mantenimiento Creado',
          text: 'El mantenimiento ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Limpiar el formulario
        this.form = {
          idMantenimiento: '',
          fechaInicio: '',
          fechaFin: '',
          descripcion: '',
          estado: ''
        };

        // Redirigir a otra página si es necesario
        // this.$router.push('/ruta-a-donde-redirigir');
      } catch (error) {
        // Mostrar mensaje de error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el mantenimiento.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error al crear el mantenimiento:', error);
      }
    }
  }
};
</script>



<style scoped src="@/assets/styles/mantenimiento/mantenimientoNew.css"></style>