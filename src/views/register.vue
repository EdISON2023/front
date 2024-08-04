<template>
  <div class="container">
    <div class="image-section">
      <img src="@/img/fondoinicio.avif" alt="admin">
    </div>
    <div class="login-section">
      <div class="logo">
        <h1>MIKRO<span class="texto">MOVILAB</span></h1>
        <p>Movilidad sustentable para Quito</p>
      </div>
      <form @submit.prevent="register">
          <div class="name-group">
          <div class="input">
            <label for="nombre">Nombre <span class="required">*</span></label>
            <input id="nombre" type="text" placeholder="Nombre" required v-model="form.nombre">
          </div>
          <div class="input">
            <label for="apellidos">Apellido <span class="required">*</span></label>
            <input id="apellidos" type="text" placeholder="Apellidos" required v-model="form.apellidos">
          </div>
        </div>
        <div class="input">
            <label for="email">Correo <span class="required">*</span></label>
            <input id="email" type="email" placeholder="Email" required v-model="form.email">
          </div>
        <div class="input">
            <label for="password">Contraseña <span class="required">*</span></label>
            <input id="password" type="text" placeholder="Password" required v-model="form.password">
          </div>
        <div class="input">
            <label for="tel">Teléfono <span class="required">*</span></label>
            <input id="tel" type="number" placeholder="Teléfono" required v-model="form.tel">
          </div>
        <div class="input">
            <label for="date">Fecha de Nacimiento <span class="required">*</span></label>
            <input id="date" type="date" placeholder="date" required v-model="form.date">
          </div>
     
          <router-link to="/dashboard" class="custom-btn active">Registrate</router-link>
        <router-link to="/" class="register-link">
        <i></i> <span class="register-button">Iniciar Sesión</span>
      </router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        fecha_nacimiento: '',
        estado: ''
      }
    };
  },
  methods: {
    register() {
      console.log('Usuario registrado:', this.form);
    }
  }
}
</script>

<style scoped>



 body {
  margin: 0;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  width: 100%;
  height: 100vh;

}

.image-section {
  flex: 2;
  display: flex;
  justify-content: center;

}

.image-section img {
  max-width: 160%;
  max-height: 100%;
}

.login-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: -20%;
  padding: 40px;

}

.logo {
  text-align: center;
}

.logo h1 {
  display: inline;
  font-size: 2.5em;
  color: #10b981;

}

.logo .text {
  display: inline;
  font-size: 2.5em;
  color: gray;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 330px;
}

.name-group {
  display: flex;
  gap: 10px;
}

input {
  padding: 9px;
  margin: 3px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
}
.required {
color: red;
}



.register-link {
text-align: center; 
margin-top: 10px; 
}
/* Estilos CSS del boton */
.custom-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #10b981;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  }
</style>
