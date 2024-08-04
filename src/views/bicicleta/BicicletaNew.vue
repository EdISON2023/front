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
          <label for="nombre_bicicleta" class="form-label">Nro. de serie<span class="required">*</span>:</label>
          <input type="number" id="nombre_bicicleta" v-model="form.nombre_bicicleta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="descripcion_bicicleta" class="form-label">Modelo  <span class="required">*</span>:</label>
          <textarea id="descripcion_bicicleta" v-model="form.descripcion_bicicleta" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="ubicacion_bicicleta" class="form-label">Marca <span class="required">*</span>:</label>
          <input type="text" id="ubicacion_bicicleta" v-model="form.ubicacion_bicicleta" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estadobicicleta" class="form-label">Estado <span class="required">*</span>:</label>
          <input type="text" id="estadobicicleta" v-model="form.estadobicicleta" class="form-control" required>
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
  name: 'BicicletaNew',
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
        nombre_bicicleta: '',
        descripcion_bicicleta: '',
        ubicacion_bicicleta: '',       
        estado_bicicleta: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Nombre: ${this.form.nombre_bicicleta}
          Descripción: ${this.form.descripcion_bicicleta}
          Ubicación: ${this.form.ubicacion_bicicleta}
          Estado: ${this.form.estado_bicicleta ? 'Activo' : 'Inactivo'}
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


<style scoped src="@/assets/styles/bicicleta/bicicletaNew.css"></style>