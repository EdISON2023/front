<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Bicicleta</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar por nombre..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Numero de serie</th>
            <th><i class="fas fa-info-circle"></i> Modelo</th>
            <th><i class="fas fa-map-marker-alt"></i>Marca</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredPuntos.length === 0">
            <td colspan="6" class="text-center">Sin registros de Bicicletas</td>
          </tr>
          <tr v-for="punto in filteredPuntos" :key="punto.puntointeresId">
            <td>{{ punto.createPunto }}</td>
            <td>{{ punto.nombrePunto }}</td>
            <td>{{ punto.descripcionPunto }}</td>
            <td>{{ punto.ubicacionPunto }}</td>
            <td :class="{'status-active': punto.estadoPunto, 'status-inactive': !punto.estadoPunto}">
              {{ punto.estadoPunto ? 'Activo' : 'Inactivo' }}
            </td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', punto)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(punto.puntointeresId)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredPuntos.length }} resultados encontrados: Mostrando página 1 de 100</p>
        <button class="add-btn" @click="redirectToCreatePunto">Agregar</button>
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
            <label for="nombre_punto" class="form-label">Numero de serie <span class="required">*</span>:</label>
            <input type="text" id="nombre_punto" v-model="form.nombrePunto" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="descripcion_punto" class="form-label">Marca <span class="required">*</span>:</label>
            <input type="text" id="descripcion_punto" v-model="form.descripcionPunto" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="ubicacion_punto" class="form-label">Modelo <span class="required">*</span>:</label>
            <input type="text" id="ubicacion_punto" v-model="form.ubicacionPunto" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estadoPunto" class="form-label">Estado <span class="required">*</span>:</label>
            <input type="text" id="estadoPunto" v-model="form.estadoPunto" class="form-control" required>
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
import axios from 'axios';

export default {
  name: 'PuntoInteresView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      puntos: [],
      searchQuery: '',
      isOffCanvasOpen: false,
      offCanvasTitle: '',
      form: {
        puntointeresId: null,
        nombrePunto: '',
        descripcionPunto: '',
        ubicacionPunto: '',
        estadoPunto: true,
        createPunto: ''
      },
    };
  },
  computed: {
    filteredPuntos() {
      if (!this.searchQuery) {
        return this.puntos;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.puntos.filter(punto => 
        punto.nombrePunto.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchPuntos() {
      try {
        const response = await axios.get('http://localhost:4200/puntoInteres');
        this.puntos = response.data;
      } catch (error) {
        console.error('Error al obtener los puntos de interés:', error);
      }
    },
    openOffCanvas(action, punto = null) {
      if (action === 'edit') {
        this.offCanvasTitle = 'Editar Punto de Interés';
        this.form = { ...punto };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async handleDeleteClick(puntointeresId) {
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
            await axios.delete(`http://localhost:4200/puntoInteres/${puntointeresId}`);
            this.puntos = this.puntos.filter(punto => punto.puntointeresId !== puntointeresId);
            Swal.fire('¡Borrado!', 'la bicicleta ha sido borrado.', 'success');
          } catch (error) {
            Swal.fire('Error', 'Hubo un error al borrar la bicicleta.', 'error');
            console.error('Error al borrar la bicicleta:', error);
          }
        }
      });
    },
    async submitForm() {
      try {
        if (this.form.puntointeresId) {
          // Actualizar un punto existente
          await axios.put(`http://localhost:4200/puntoInteres/${this.form.puntointeresId}`, this.form);
          const index = this.puntos.findIndex(p => p.puntointeresId === this.form.puntointeresId);
          if (index !== -1) {
            this.puntos[index] = { ...this.form };
            Swal.fire('¡Actualizado!', 'El punto de interés ha sido actualizado.', 'success');
          }
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al guardar el punto de interés.', 'error');
        console.error('Error al guardar el punto de interés:', error);
      }
    },
    redirectToCreatePunto() {
      this.$router.push('/create/PuntoInteres');
    }
  },
  mounted() {
    this.fetchPuntos();
  }
};
</script>

<style scoped src="@/assets/styles/puntoInteres/puntoInteresView.css"></style>
