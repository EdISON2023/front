<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nueva Ruta</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombre_ruta" class="form-label">Nombre de la ruta <span class="required">*</span>:</label>
          <input type="text" id="nombre_ruta" v-model="form.nombre_ruta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcion_ruta" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="descripcion_ruta" v-model="form.descripcion_ruta" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacion_ruta" class="form-label">Ubicación <span class="required">*</span>:</label>
          <input type="text" id="ubicacion_ruta" v-model="form.ubicacion_ruta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estado_ruta" class="form-label">Estado <span class="required">*</span>:</label>
          <label class="switch">
            <input type="checkbox" v-model="form.estado_ruta">
            <span class="slider round"></span>
          </label>
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

export default {
  name: 'RutaNew',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
      form: {
        nombre_ruta: '',
        descripcion_ruta: '',
        ubicacion_ruta: '',        
        estado_ruta: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Nombre: ${this.form.nombre_ruta}
          Descripción: ${this.form.descripcion_ruta}
          Ubicación: ${this.form.ubicacion_ruta}
          Estado: ${this.form.estado_ruta ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(this.form);
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    }
  }
};
</script>


<style scoped src="@/assets/styles/ruta/rutaNew.css"></style>