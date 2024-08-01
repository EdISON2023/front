<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Guía de Voz</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar..." v-model="searchQuery">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha</th>
            <th><i class="fas fa-info-circle"></i> Descripción</th>
            <th><i class="fas fa-volume-up"></i> URL de Audio</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredItems.length === 0">
            <td colspan="5" class="text-center">Sin registros de Guía de Voz</td>
          </tr>
          <tr v-for="item in filteredItems" :key="item.guiaVozId">
            <td>{{ formatDate(item.createGuiaVoz) }}</td>
            <td>{{ item.descripcionGuiaVoz }}</td>
            <td>{{ item.audioUrlGuiaVoz }}</td>
            <td class="status">{{ item.estadoGuiaVoz ? 'Activo' : 'Inactivo' }}</td>
            <td class="actions">
              <i class="fas fa-plus-circle" @click="redirectToForm"></i>
              <i class="fas fa-edit" @click="openOffCanvas('edit', item)"></i>
              <i class="fas fa-trash-alt" @click="handleDeleteClick(item.guiaVozId)"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredItems.length }} resultados encontrados: Página 1 de 100</p>
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
            <label for="description" class="form-label">Descripción <span class="required">*</span>:</label>
            <input type="text" id="description" v-model="form.descripcionGuiaVoz" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="audioUrl" class="form-label">URL de Audio <span class="required">*</span>:</label>
            <input type="url" id="audioUrl" v-model="form.audioUrlGuiaVoz" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="status" class="form-label">Estado <span class="required">*</span>:</label>
            <label class="switch">
              <input type="checkbox" v-model="form.estadoGuiaVoz">
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
import axios from 'axios';

export default {
  name: 'GuiaVozView',
  components: {
    Navegation,
    Nav
  },
  data() {
    return {
      items: [],
      searchQuery: '',
      isOffCanvasOpen: false,
      offCanvasTitle: '',
      form: {
        guiaVozId: null,
        descripcionGuiaVoz: '',
        audioUrlGuiaVoz: '',
        idiomaGuiaVoz: '',
        estadoGuiaVoz: true,
        createGuiaVoz: '',
        updateGuiaVoz: ''
      }
    };
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) {
        return this.items;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.items.filter(item =>
        item.descripcionGuiaVoz.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:4200/guiaVoz');
        this.items = response.data;
      } catch (error) {
        console.error('Error al obtener los ítems:', error);
      }
    },
    openOffCanvas(action, item = null) {
      if (action === 'edit') {
        this.offCanvasTitle = 'Editar Guía de Voz';
        this.form = { ...item };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async handleDeleteClick(guiaVozId) {
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
            await axios.delete(`http://localhost:4200/guiaVoz/${guiaVozId}`);
            this.items = this.items.filter(item => item.guiaVozId !== guiaVozId);
            Swal.fire('¡Borrado!', 'La guía de voz ha sido borrada.', 'success');
          } catch (error) {
            Swal.fire('Error', 'Hubo un error al borrar la guía de voz.', 'error');
            console.error('Error al borrar la guía de voz:', error);
          }
        }
      });
    },
    async submitForm() {
      try {
        if (this.form.guiaVozId) {
          // Actualizar una guía de voz existente
          await axios.put(`http://localhost:4200/guiaVoz/${this.form.guiaVozId}`, this.form);
          const index = this.items.findIndex(e => e.guiaVozId === this.form.guiaVozId);
          if (index !== -1) {
            this.items[index] = { ...this.form };
            Swal.fire('¡Actualizado!', 'La guía de voz ha sido actualizada.', 'success');
          }
        } else {
          // Crear una nueva guía de voz
          await axios.post('http://localhost:4200/guiaVoz', this.form);
          this.items.push({ ...this.form, guiaVozId: Date.now() }); // Mock new ID
          Swal.fire('¡Creado!', 'La guía de voz ha sido creada.', 'success');
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al guardar la guía de voz.', 'error');
        console.error('Error al guardar la guía de voz:', error);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleDateString();
    },
    redirectToForm() {
      // Implement your redirection logic here
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>


<style scoped src="@/assets/styles/estacionMetro/estacionMetro.css"></style>

