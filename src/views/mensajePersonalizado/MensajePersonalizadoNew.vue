<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo"><h1>Crear Nuevo Mensaje Personalizado</h1></div>
      <br>
      <form @submit.prevent="submitForm" class="form">        
        <div class="form-group">
          <label for="mensaje" class="form-label">Mensaje<span class="required">*</span>:</label>
          <input type="text" id="mensaje" v-model="form.mensaje" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="contactom" class="form-label">Contacto <span class="required">*</span>:</label>
          <textarea id="contactom" v-model="form.contactom" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="estadom" class="form-label">Estado <span class="required">*</span>:</label>
          <label class="switch">
            <input type="checkbox" v-model="form.estadom">
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
  name: 'MensajePersonalizadoNew',
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
        mensaje: '',
        contactom: '',          
        estadom: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Mensaje: ${this.form.mensaje}
          Contacto: ${this.form.contactom}
          Estado: ${this.form.estadom ? 'Activo' : 'Inactivo'}
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


<style scoped src="@/assets/styles/mensajePersonalizado/mensajePersonalizadoNew.css"></style>