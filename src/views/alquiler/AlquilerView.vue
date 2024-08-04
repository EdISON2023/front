<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Alquiler</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar..." />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Entrega</th>
            <th><i class="fas fa-subway"></i> Estación de Inicio</th>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Recepción</th>
            <th><i class="fas fa-map-marker-alt"></i> Estación de Fin</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredAlquileres.length === 0">
            <td colspan="6" class="text-center">
              Sin registros de Alquiler
            </td>
          </tr>
          <tr v-for="alquiler in filteredAlquileres" :key="alquiler.id_alquiler">
            <td>{{ alquiler.fecha_entrega }}</td>
            <td>{{ alquiler.estacion_inicio }}</td>
            <td>{{ alquiler.fecha_recepcion }}</td>
            <td>{{ alquiler.estacion_fin }}</td>
            <td>{{ alquiler.estado }}</td>
            <td class="actions">
              <i
                class="fas fa-edit"
                @click="openOffCanvas('edit', alquiler)"
              ></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(alquiler.id_alquiler)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredAlquileres.length }} resultados encontrados</p>
        <button class="add-btn" @click="redirectToCreateAlquiler">
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
            <label for="fecha_entrega" class="form-label">
              Fecha de Entrega <span class="required">*</span>:
            </label>
            <input
              type="date"
              id="fecha_entrega"
              v-model="form.fecha_entrega"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estacion_inicio" class="form-label">
              Estación de Inicio <span class="required">*</span>:
            </label>
            <input
              type="text"
              id="estacion_inicio"
              v-model="form.estacion_inicio"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="fecha_recepcion" class="form-label">
              Fecha de Recepción <span class="required">*</span>:
            </label>
            <input
              type="date"
              id="fecha_recepcion"
              v-model="form.fecha_recepcion"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estacion_fin" class="form-label">
              Estación de Fin <span class="required">*</span>:
            </label>
            <input
              type="text"
              id="estacion_fin"
              v-model="form.estacion_fin"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="estado" class="form-label">
              Estado <span class="required">*</span>:
            </label>
            <input
              type="text"
              id="estado"
              v-model="form.estado"
              class="form-control"
              required
            />
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
  name: "AlquilerView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      alquileres: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        id_alquiler: null,
        fecha_entrega: "",
        estacion_inicio: "",
        fecha_recepcion: "",
        estacion_fin: "",
        estado: "",
      },
    };
  },
  computed: {
    filteredAlquileres() {
      if (!this.searchQuery) {
        return this.alquileres;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.alquileres.filter((alquiler) =>
        alquiler.estacion_inicio.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchAlquileres() {
      try {
        const response = await axios.get("http://localhost:4200/alquiler");
        this.alquileres = response.data;
      } catch (error) {
        console.error("Error al obtener los alquileres:", error);
      }
    },
    openOffCanvas(action, alquiler = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Alquiler";
        this.form = { ...alquiler };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    // Función eliminar

    //async handleDeleteClick(id_alquiler) {
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
    //await axios.delete(`http://localhost:4200/alquiler/${id_alquiler}`);
    //this.alquileres = this.alquileres.filter(alquiler => alquiler.id_alquiler !== id_alquiler);
    //Swal.fire('¡Borrado!', 'El alquiler ha sido borrado.', 'success');
    //} catch (error) {
    //Swal.fire('Error', 'Hubo un error al borrar el alquiler.', 'error');
    //console.error('Error al borrar el alquiler:', error);
    //}
    //}
    //});
    //},

    async submitForm() {
      try {
        await axios.put(
          `http://localhost:4200/alquiler/${this.form.id_alquiler}`,
          this.form
        );
        const index = this.alquileres.findIndex(
          (e) => e.id_alquiler === this.form.id_alquiler
        );
        if (index !== -1) {
          this.alquileres[index] = { ...this.form };
          Swal.fire(
            "¡Actualizado!",
            "El alquiler ha sido actualizado.",
            "success"
          );
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al actualizar el alquiler.", "error");
        console.error("Error al actualizar el alquiler:", error);
      }
    },
    redirectToCreateAlquiler() {
      this.$router.push("/create/Alquiler");
    },
  },
  mounted() {
    this.fetchAlquileres();
  },
};
</script>

<style scoped src="@/assets/styles/alquiler/alquilerView.css"></style>
