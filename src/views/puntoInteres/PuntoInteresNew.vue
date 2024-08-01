<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nueva Bicicleta
      </h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="nombre_punto" class="form-label">Nro. de serie<span class="required">*</span>:</label>
          <input type="number" id="nombre_punto" v-model="form.nombre_punto" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcion_punto" class="form-label">Modelo  <span class="required">*</span>:</label>
          <textarea id="descripcion_punto" v-model="form.descripcion_punto" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacion_punto" class="form-label">Marca <span class="required">*</span>:</label>
          <input type="text" id="ubicacion_punto" v-model="form.ubicacion_punto" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estadoPunto" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadoPunto" v-model="form.estadoPunto" class="form-control" required>
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
  name: 'PuntoInteresNew',
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
        nombre_punto: '',
        descripcion_punto: '',
        ubicacion_punto: '',       
        estado_punto: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Nombre: ${this.form.nombre_punto}
          Descripción: ${this.form.descripcion_punto}
          Ubicación: ${this.form.ubicacion_punto}
          Estado: ${this.form.estado_punto ? 'Activo' : 'Inactivo'}
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


<style scoped src="@/assets/styles/puntoInteres/puntoInteresNew.css"></style>