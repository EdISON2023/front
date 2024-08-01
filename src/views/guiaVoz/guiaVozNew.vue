<template>
  <Navegation />
  <div class="content">
    <Nav />
    <div class="form-container">
      <br>
      <div class="titulo">
        <h1>Crear Nueva Guía de Voz</h1>
      </div>
      <br>
      <form @submit.prevent="submitForm" class="form">                
        <div class="form-group">
          <label for="descripcion_g" class="form-label">Descripción <span class="required">*</span>:</label>
          <textarea id="descripcion_g" v-model="form.descripcion_g" class="form-control" rows="2" required></textarea>
        </div>
        <div class="form-group">
          <label for="audio_url" class="form-label">Audio URL<span class="required">*</span>:</label>
          <input type="text" id="audio_url" v-model="form.audio_url" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="idioma" class="form-label">Idioma <span class="required">*</span>:</label>
          <input type="text" id="idioma" v-model="form.idioma" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="estado" class="form-label">Estado <span class="required">*</span>:</label>
          <label class="switch">
            <input type="checkbox" v-model="form.estado">
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
  name: 'GuiaVozNew',
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
        descripcion_g: '',
        audio_url: '',
        idioma: '',        
        estado: false
      }
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        title: 'Formulario Enviado',
        text: `
          Descripción: ${this.form.descripcion_g}
          Audio URL: ${this.form.audio_url}
          Idioma: ${this.form.idioma}
          Estado: ${this.form.estado ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(this.form);
    }
  }
};
</script>

<style scoped src="@/assets/styles/guiaVoz/guiaVozNew.css"></style>