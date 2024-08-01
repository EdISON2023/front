<template>
  <Navegation />
  
  <div class="content">
    <Nav />

    <div class="info-container">
      <p>
        Es un proyecto integral que utiliza tecnología de localización y guías de voz para asistir a personas con discapacidad visual en su navegación diaria utilizando el metro de Quito. La estructura de la base de datos está diseñada para manejar información detallada sobre usuarios, estaciones de metro, puntos de interés, rutas y mensajes personalizados, asegurando que los usuarios reciban la guía necesaria de manera eficiente y accesible.
      </p>
    </div>
    <div class="map-container">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.27990657607!2d-74.25986527855468!3d40.697670063015096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2451a1b57a25d%3A0x6e3f4b2f7f8f5bb1!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1604296787341!5m2!1sen!2s" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        aria-hidden="false" 
        tabindex="0">
      </iframe>
    </div>
    <br>
    <div class="recent-users-container">
      <h2>Usuarios Recientes</h2>
      <div class="user-card" v-for="user in recentUsers" :key="user.id">
        <img :src="user.image" alt="Foto de usuario" class="user-photo"/>
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p>{{ user.activityDate }}</p>
        </div>
      </div>
    </div>
    <div class="metro-and-stations">
      <div class="stations-container">
        <h2>Estaciones</h2>
        <div class="station-card" v-for="station in stations" :key="station.id">
          <img :src="station.image" alt="Foto de estación" class="station-photo"/>
          <div class="station-info">
            <h3>{{ station.name }}</h3>
            <p>{{ station.date }} | {{ station.time }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';

export default {
  name: 'HomeView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://via.placeholder.com/40',
      recentUsers: [
        { id: 1, name: 'Leo Jacome', activityDate: '24 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4526/4526169.png' },
        { id: 2, name: 'Andrea Jiron', activityDate: '24 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4202/4202850.png' },
        { id: 3, name: 'Nuria Ortiz', activityDate: '23 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4202/4202850.png' },
        { id: 4, name: 'Andres Gaona', activityDate: '21 Jan, 2023', image: 'https://cdn-icons-png.flaticon.com/128/4526/4526169.png' },
      ],
      stations: [
        { id: 1, name: 'Morán Valverde', date: '30 Enero, 2024', time: '4:00 PM', image: 'https://metro-quito.com/wp-content/uploads/Estacion-Moran-Valverde.jpg' },
        { id: 2, name: 'Solanda', date: '30 Enero, 2024', time: '4:00 PM', image: 'https://gk.city/wp-content/uploads/2023/12/logo-metro-equivocado.jpg' },
        { id: 3, name: 'Cardenal de la Torre', date: '30 Enero, 2024', time: '4:00 PM', image: 'https://metro-quito.com/wp-content/uploads/Estacion-Cardenal-de-la-Torre.jpg' },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped src="@/assets/styles/dashboard/dashboard.css"></style>


