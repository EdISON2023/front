<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Estación</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar..." />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Date</th>
            <th><i class="fas fa-subway"></i> Nombre</th>
            <th><i class="fas fa-map-marker-alt"></i> Ubicación</th>
            <th><i class="fas fa-align-left"></i> Capacidad</th>
            <th><i class="fas fa-cube"></i> Cantidad Actual</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEstaciones.length === 0">
            <td colspan="7" class="text-center">
              Sin registros de Estación
            </td>
          </tr>
          <tr v-for="estacion in filteredEstaciones" :key="estacion.id_estacion">
            <td>{{ estacion.createDate }}</td>
            <td>{{ estacion.nombre }}</td>
            <td>{{ estacion.ubicacion }}</td>
            <td>{{ estacion.capacidad }}</td>
            <td>{{ estacion.cantidad_actual }}</td>
            <td>{{ estacion.estado }}</td>
            <td class="actions">
              <i class="fas fa-edit" @click="openOffCanvas('edit', estacion)"></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(estacion.id_estacion)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredEstaciones.length }} resultados encontrados</p>
        <button class="add-btn" @click="redirectToCreateEstacion">
          Agregar
        </button>
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
            <label for="nombre" class="form-label">Nombre <span class="required">*</span>:</label>
            <input type="text" id="nombre" v-model="form.nombre" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="ubicacion" class="form-label">Ubicación <span class="required">*</span>:</label>
            <input type="text" id="ubicacion" v-model="form.ubicacion" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="capacidad" class="form-label">Capacidad <span class="required">*</span>:</label>
            <input type="number" id="capacidad" v-model="form.capacidad" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="cantidad_actual" class="form-label">Cantidad Actual <span class="required">*</span>:</label>
            <input type="number" id="cantidad_actual" v-model="form.cantidad_actual" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="estado" class="form-label">Estado <span class="required">*</span>:</label>
            <input type="text" id="estado" v-model="form.estado" class="form-control" required />
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
import Nav from "@/components/Nav.vue";
import Navegation from "@/components/Navegation.vue";
import Swal from "sweetalert2";
import axios from "axios"; // Aquí está el import correcto

export default {
  name: "EstacionView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      estaciones: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        id_estacion: null,
        nombre: "",
        ubicacion: "",
        capacidad: 0,
        cantidad_actual: 0,
        estado: "",
      },
    };
  },
  computed: {
    filteredEstaciones() {
      if (!this.searchQuery) {
        return this.estaciones;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.estaciones.filter((estacion) =>
        estacion.nombre.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchEstaciones() {
      try {
        const response = await axios.get("http://localhost:4200/estacion");
        this.estaciones = response.data;
      } catch (error) {
        console.error("Error al obtener las estaciones:", error);
      }
    },
    openOffCanvas(action, estacion = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Estación";
        this.form = { ...estacion };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    // Función eliminar

    //async handleDeleteClick(estacionId) {
    //Swal.fire({
    //title: '¿Estás seguro?',
    //text: "¡No podrás revertir esto!",
    //icon: 'warning',
    //showCancelButton: true,
    // confirmButtonColor: '#3085d6',
    //cancelButtonColor: '#d33',
    //confirmButtonText: 'Sí, bórralo!'
    //}).then(async (result) => {
    //if (result.isConfirmed) {
    //try {
    //await axios.delete(`http://localhost:4200/estacion/${estacionId}`);
    //this.estaciones = this.estaciones.filter(estacion => estacion.id_estacion !== estacionId);
    //Swal.fire('¡Borrado!', 'La estación ha sido borrada.', 'success');
    //} catch (error) {
    //Swal.fire('Error', 'Hubo un error al borrar la estación.', 'error');
    //console.error('Error al borrar la estación:', error);
    //}
    //}
    //});
    //},

    async submitForm() {
      try {
        await axios.put(
          `http://localhost:4200/estacion/${this.form.id_estacion}`,
          this.form
        );
        const index = this.estaciones.findIndex(
          (e) => e.id_estacion === this.form.id_estacion
        );
        if (index !== -1) {
          this.estaciones[index] = { ...this.form };
          Swal.fire(
            "¡Actualizado!",
            "La estación ha sido actualizada.",
            "success"
          );
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al actualizar la estación.", "error");
        console.error("Error al actualizar la estación:", error);
      }
    },
    redirectToCreateEstacion() {
      this.$router.push("/create/Estacion");
    },
  },
  mounted() {
    this.fetchEstaciones();
  },
};
</script>
<style scoped src="@/assets/styles/estacion/estacionView.css"></style>
