<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Bicicleta</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar por número de serie..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-user"></i> Número de serie</th>
            <th><i class="fas fa-info-circle"></i> Modelo</th>
            <th><i class="fas fa-map-marker-alt"></i> Marca</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredBicicletas.length === 0">
            <td colspan="6" class="text-center">Sin registros de bicicletas</td>
          </tr>
          <tr v-for="bicicleta in filteredBicicletas" :key="bicicleta.bicicletaId">
            <td>{{ bicicleta.createFecha }}</td>
            <td>{{ bicicleta.numeroSerie }}</td>
            <td>{{ bicicleta.modelo }}</td>
            <td>{{ bicicleta.marca }}</td>
            <td :class="{'status-active': bicicleta.estado, 'status-inactive': !bicicleta.estado}">
              {{ bicicleta.estado ? 'Activo' : 'Inactivo' }}
            </td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', bicicleta)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(bicicleta.bicicletaId)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredBicicletas.length }} resultados encontrados: Mostrando página 1 de 100</p>
        <button class="add-btn" @click="redirectToCreateBicicleta">Agregar</button>
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
            <label for="numero_serie" class="form-label">Número de serie <span class="required">*</span>:</label>
            <input type="text" id="numero_serie" v-model="form.numeroSerie" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="marca" class="form-label">Marca <span class="required">*</span>:</label>
            <input type="text" id="marca" v-model="form.marca" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="modelo" class="form-label">Modelo <span class="required">*</span>:</label>
            <input type="text" id="modelo" v-model="form.modelo" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="estado" class="form-label">Estado <span class="required">*</span>:</label>
            <input type="text" id="estado" v-model="form.estado" class="form-control" required>
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
  name: 'BicicletaView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      bicicletas: [],
      searchQuery: '',
      isOffCanvasOpen: false,
      offCanvasTitle: '',
      form: {
        bicicletaId: null,
        numeroSerie: '',
        marca: '',
        modelo: '',
        estado: true,
        createFecha: ''
      },
    };
  },
  computed: {
    filteredBicicletas() {
      if (!this.searchQuery) {
        return this.bicicletas;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.bicicletas.filter(bicicleta => 
        bicicleta.numeroSerie.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchBicicletas() {
      try {
        const response = await axios.get('http://localhost:4200/bicicleta');
        this.bicicletas = response.data;
      } catch (error) {
        console.error('Error al obtener las bicicletas:', error);
      }
    },
    openOffCanvas(action, bicicleta = null) {
      if (action === 'edit') {
        this.offCanvasTitle = 'Editar Bicicleta';
        this.form = { ...bicicleta };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async handleDeleteClick(bicicletaId) {
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
            await axios.delete(`http://localhost:4200/bicicleta/${bicicletaId}`);
            this.bicicletas = this.bicicletas.filter(bicicleta => bicicleta.bicicletaId !== bicicletaId);
            Swal.fire('¡Borrado!', 'La bicicleta ha sido borrada.', 'success');
          } catch (error) {
            Swal.fire('Error', 'Hubo un error al borrar la bicicleta.', 'error');
            console.error('Error al borrar la bicicleta:', error);
          }
        }
      });
    },
    async submitForm() {
      try {
        if (this.form.bicicletaId) {
          // Actualizar una bicicleta existente
          await axios.put(`http://localhost:4200/bicicleta/${this.form.bicicletaId}`, this.form);
          const index = this.bicicletas.findIndex(b => b.bicicletaId === this.form.bicicletaId);
          if (index !== -1) {
            this.bicicletas[index] = { ...this.form };
            Swal.fire('¡Actualizado!', 'La bicicleta ha sido actualizada.', 'success');
          }
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al guardar la bicicleta.', 'error');
        console.error('Error al guardar la bicicleta:', error);
      }
    },
    redirectToCreateBicicleta() {
      this.$router.push('/create/Bicicleta');
    }
  },
  mounted() {
    this.fetchBicicletas();
  }
};
</script>

<style scoped src="@/assets/styles/bicicleta/bicicletaView.css"></style>
