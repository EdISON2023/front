<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Rutas</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar por nombre..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-subway"></i> Nombre de la ruta</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRutas.length === 0">
            <td colspan="6" class="text-center">Sin registros de Rutas</td>
          </tr>
          <tr v-for="ruta in filteredRutas" :key="ruta.rutaId">
            <td>{{ ruta.createRuta }}</td>
            <td>{{ ruta.nombreRuta }}</td>
            <td>{{ ruta.descripcionRuta }}</td>
            <td>{{ ruta.ubicacionRuta }}</td>
            <td class="status">{{ ruta.estadoRuta ? 'Activo' : 'Inactivo' }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="openOffCanvas('add')"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', ruta)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(ruta.rutaId)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredRutas.length }} resultados encontrados: Mostrando página 1 de 100</p>
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
            <label for="nombre_ruta" class="form-label">Nombre de la ruta <span class="required">*</span>:</label>
            <input type="text" id="nombre_ruta" v-model="form.nombreRuta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion_ruta" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="descripcion_ruta" v-model="form.descripcionRuta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="ubicacion_ruta" class="form-label">Ubicación <span class="required">*</span>:</label>
            <input type="text" id="ubicacion_ruta" v-model="form.ubicacionRuta" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado_ruta" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estadoRuta">
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
import axios from 'axios'; // Aquí está el import correcto

export default {
  name: 'RutasView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      rutas: [],
      searchQuery: '',
      isOffCanvasOpen: false,
      offCanvasTitle: '',
      form: {
        rutaId: null,
        nombreRuta: '',
        descripcionRuta: '',
        ubicacionRuta: '',
        estadoRuta: true
      }
    };
  },
  computed: {
    filteredRutas() {
      if (!this.searchQuery) {
        return this.rutas;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.rutas.filter(ruta => 
        ruta.nombreRuta.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchRutas() {
      try {
        const response = await axios.get('http://localhost:4200/ruta');
        this.rutas = response.data;
      } catch (error) {
        console.error('Error al obtener las rutas:', error);
      }
    },
    openOffCanvas(action, ruta = null) {
      if (action === 'edit') {
        this.offCanvasTitle = 'Editar Ruta';
        this.form = { ...ruta };
        this.isOffCanvasOpen = true;
      } else if (action === 'add') {
        this.offCanvasTitle = 'Agregar Ruta';
        this.form = {
          rutaId: null,
          nombreRuta: '',
          descripcionRuta: '',
          ubicacionRuta: '',
          estadoRuta: true
        };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async handleDeleteClick(rutaId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:4200/ruta/${rutaId}`);
            this.rutas = this.rutas.filter(ruta => ruta.rutaId !== rutaId);
            Swal.fire('¡Borrado!', 'La ruta ha sido borrada.', 'success');
          } catch (error) {
            Swal.fire('Error', 'Hubo un error al borrar la ruta.', 'error');
            console.error('Error al borrar la ruta:', error);
          }
        }
      });
    },
    async submitForm() {
      try {
        if (this.form.rutaId) {
          // Actualizar una ruta existente
          await axios.put(`http://localhost:4200/ruta/${this.form.rutaId}`, this.form);
          const index = this.rutas.findIndex(r => r.rutaId === this.form.rutaId);
          if (index !== -1) {
            this.rutas[index] = { ...this.form };
            Swal.fire('¡Actualizado!', 'La ruta ha sido actualizada.', 'success');
          }
        } else {
          // Crear una nueva ruta
          const response = await axios.post('http://localhost:4200/ruta', this.form);
          this.rutas.push(response.data);
          Swal.fire('¡Creada!', 'La ruta ha sido creada.', 'success');
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al guardar la ruta.', 'error');
        console.error('Error al guardar la ruta:', error);
      }
    }
  },
  mounted() {
    this.fetchRutas();
  }
};
</script>


<style scoped src="@/assets/styles/ruta/rutaView.css"></style>
