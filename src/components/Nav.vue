<template>
  <div class="content">
    <div class="header-container">
      <h1>Mikromovilab</h1>
      <div class="dropdown" @click="toggleDropdown">
        <div class="user-info">
          <span>{{ username }}</span>
          <img :src="userImage" alt="User Image" class="user-image">
        </div>
        <div v-if="isOpen" class="dropdown-content">
          <router-link to="/create/User">Perfil</router-link>
          <router-link to="/">Cerrar Sesion</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      username: 'Fatima',
      userImage: 'https://cdn-icons-png.flaticon.com/128/4202/4202850.png',
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    }
  },
};
</script>

<style scoped>
.content {
  margin-left: 20px;
  padding: 15px;
  width: calc(100% - 220px);
}

.header-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 70vw; 
  right: 10px;
}

.header-container h1 {
  margin: 0;
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-info span {
  margin-right: 10px;
}

.user-image {
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 10px;
  background-color: #1f2937;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #047857;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
