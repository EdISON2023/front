<template>
    <div class="container">
        <div class="image-section">
            <img src="@/img/fondoinicio.avif" alt="admin">
        </div>
        <div class="login-section">
          <div class="logo">
              <h1>MiIKRO<span class="texto">MOVILAB</span></h1>
              <p>Movilidad sustentable para Quito</p>
            </div>
            <form @submit.prevent="login">
                <input type="email" placeholder="Correo Electronico" required v-model="email">
                <input type="password" placeholder="Contraseña" required v-model="password">
  
                <button  type="submit">Iniciar Sesión</button>
  
              
                <div class="register-link">
                  <p>¿Eres nuevo usuario?</p>
                  <router-link to="/register">
                     <i ></i> Registrate
                  </router-link>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            // Aquí podrías agregar lógica para validar y autenticar el usuario
            // Simulando una redirección a '/home' después de autenticar
            console.log('Usuario autenticado:', this.email);
            this.$router.push('/dashboard');
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
      max-width: 130%;
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
  
  .logo .text{
    display: inline;
    font-size: 2.5em;
    color: gray;
  }
  
  form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
      margin-right: -20%;
  }
  
  input {
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 9px;
      background-color: #dadada;
  }
  
  
  .register-link {
      margin-top: 20px;
      text-align: center;
  }
  
  .register-link a {
      color: #007bff;
      text-decoration: none;
  }
  
  .register-link a:hover {
      text-decoration: underline;
  }
    /* Estilos CSS del boton */
    button {
        margin-top: 10px;
        padding: 10px;
        background-color: #10b981;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
  
  </style>