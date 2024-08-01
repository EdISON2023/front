<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Usuarios</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-user"></i> Nombres</th>
            <th><i class="fas fa-id-card-alt"></i> Apellidos</th>
            <th><i class="fas fa-at"></i> Correo</th>
            <th><i class="fas fa-phone-alt"></i> Teléfono</th>
            <th><i class="fas fa-birthday-cake"></i> F.Nacimiento</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="8" class="text-center">Sin registros de Usuarios</td>
          </tr>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.date }}</td>
            <td>{{ user.nombre }}</td>
            <td>{{ user.apellido }}</td>
            <td>{{ user.correo }}</td>
            <td>{{ user.telefono }}</td>
            <td>{{ user.fechaNacimiento }}</td>
            <td :class="{'status-active': user.estado === 'Activo', 'status-inactive': user.estado === 'Inactivo'}">
              {{ user.estado }}
            </td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', user)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(user.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredUsers.length }} resultados encontrados: Mostrando página 1 de 100</p>
        <button class="add-btn" @click="redirectToCreateUsuario">Agregar</button>
        <button>Previous</button>
        <button class="active">1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
    <div :class="['off-canvas', { open: isOffCanvasOpen }]">
      <div class="off-canvas-header">
        <h2>{{ offCanvasTitle }}</h2>
        <button @click="closeOffCanvas" class="close-btn">&times;</button>
      </div>
      <div class="off-canvas-body">
        <form @submit.prevent="submitForm" class="form">
          <div class="form-group">
            <label for="nombre_usuario" class="form-label">Nombres <span class="required">*</span>:</label>
            <input type="text" id="nombre_usuario" v-model="form.nombre_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="apellido_usuario" class="form-label">Apellidos <span class="required">*</span>:</label>
            <input type="text" id="apellido_usuario" v-model="form.apellido_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="correo_usuario" class="form-label">Email <span class="required">*</span>:</label>
            <input type="email" id="correo_usuario" v-model="form.correo_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="telefono_usuario" class="form-label">Teléfono <span class="required">*</span>:</label>
            <input type="text" id="telefono_usuario" v-model="form.telefono_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="fecha_nacimiento_usuario" class="form-label">Fecha de Nacimiento <span class="required">*</span>:</label>
            <input type="date" id="fecha_nacimiento_usuario" v-model="form.fecha_nacimiento_usuario" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado_usuario" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estado_usuario">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="form-group-button">
            <button type="submit" class="btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Navegation from '@/components/Navegation.vue';
import Swal from 'sweetalert2';

export default {
  name: 'UserView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      isOffCanvasOpen: false,
      offCanvasTitle: '',
      form: {
        id: null,
        nombre_usuario: '',
        apellido_usuario: '',
        correo_usuario: '',
        telefono_usuario: '',
        fecha_nacimiento_usuario: '',
        estado_usuario: false
      },
      searchQuery: '',
      users: [
        { id: 1, date: '12 Jan 2022', nombre: 'Juan', apellido: 'Andrade', correo: 'juandandrade@gmail.com', telefono: '0987475123', fechaNacimiento: '2002-04-14', estado: 'Activo' },
        { id: 2, date: '15 Feb 2022', nombre: 'Maria', apellido: 'Gomez', correo: 'maria.gomez@gmail.com', telefono: '0987654321', fechaNacimiento: '1995-08-22', estado: 'Inactivo' }
      ]
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(user =>
        user.nombre.toLowerCase().includes(query) ||
        user.apellido.toLowerCase().includes(query) ||
        user.correo.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    openOffCanvas(action, user = null) {
      this.offCanvasTitle = action === 'add' ? 'Agregar Usuario' : 'Editar Usuario';
      if (action === 'edit' && user) {
        this.form = {
          id: user.id,
          nombre_usuario: user.nombre,
          apellido_usuario: user.apellido,
          correo_usuario: user.correo,
          telefono_usuario: user.telefono,
          fecha_nacimiento_usuario: user.fechaNacimiento,
          estado_usuario: user.estado === 'Activo'
        };
      } else {
        this.form = {
          id: null,
          nombre_usuario: '',
          apellido_usuario: '',
          correo_usuario: '',
          telefono_usuario: '',
          fecha_nacimiento_usuario: '',
          estado_usuario: false
        };
      }
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    handleDeleteClick(userId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el usuario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id !== userId);
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          );
        }
      });
    },
    submitForm() {
      if (this.form.id) { // Editar
        const index = this.users.findIndex(user => user.id === this.form.id);
        if (index !== -1) {
          this.users[index] = {
            ...this.users[index],
            nombre: this.form.nombre_usuario,
            apellido: this.form.apellido_usuario,
            correo: this.form.correo_usuario,
            telefono: this.form.telefono_usuario,
            fechaNacimiento: this.form.fecha_nacimiento_usuario,
            estado: this.form.estado_usuario ? 'Activo' : 'Inactivo'
          };
        }
      } else { // Agregar
        this.users.push({
          id: Date.now(), // Generar ID único para el nuevo usuario
          date: new Date().toLocaleDateString(),
          nombre: this.form.nombre_usuario,
          apellido: this.form.apellido_usuario,
          correo: this.form.correo_usuario,
          telefono: this.form.telefono_usuario,
          fechaNacimiento: this.form.fecha_nacimiento_usuario,
          estado: this.form.estado_usuario ? 'Activo' : 'Inactivo'
        });
      }
      
      Swal.fire({
        title: 'Datos Guardados',
        text: `
          Nombres: ${this.form.nombre_usuario}
          Apellidos: ${this.form.apellido_usuario}
          Email: ${this.form.correo_usuario}
          Teléfono: ${this.form.telefono_usuario}
          Fecha de Nacimiento: ${this.form.fecha_nacimiento_usuario}
          Estado: ${this.form.estado_usuario ? 'Activo' : 'Inactivo'}
        `,
        icon: 'success',
        confirmButtonText: 'OK'
      });

      this.closeOffCanvas();
    },
    redirectToCreateUsuario() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped src="@/assets/styles/User/UserView.css"></style>
