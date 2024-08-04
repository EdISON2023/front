<template>
  <Navegation />
  <div class="container">
    <Nav />
    <div class="header">
      <h2>Gestor Mantenimiento</h2>
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar..." />
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Inicio</th>
            <th><i class="fas fa-calendar-alt"></i> Fecha de Fin</th>
            <th><i class="fas fa-align-left"></i> Descripción</th>
            <th><i class="fas fa-circle text-danger"></i> Estado</th>
            <th><i class="fas fa-cogs"></i> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredMantenimientos.length === 0">
            <td colspan="5" class="text-center">
              Sin registros de Mantenimiento
            </td>
          </tr>
          <tr v-for="mantenimiento in filteredMantenimientos" :key="mantenimiento.id_mantenimiento">
            <td>{{ mantenimiento.fecha_inicio }}</td>
            <td>{{ mantenimiento.fecha_fin }}</td>
            <td>{{ mantenimiento.descripcion }}</td>
            <td>{{ mantenimiento.estado }}</td>
            <td class="actions">
              <i
                class="fas fa-edit"
                @click="openOffCanvas('edit', mantenimiento)"
              ></i>
              <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(mantenimiento.id_mantenimiento)"></i> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <p>{{ filteredMantenimientos.length }} resultados encontrados</p>
        <button class="add-btn" @click="redirectToCreateMantenimiento">
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
            <label for="fecha_inicio" class="form-label">
              Fecha de Inicio <span class="required">*</span>:
            </label>
            <input
              type="datetime-local"
              id="fecha_inicio"
              v-model="form.fecha_inicio"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="fecha_fin" class="form-label">
              Fecha de Fin <span class="required">*</span>:
            </label>
            <input
              type="datetime-local"
              id="fecha_fin"
              v-model="form.fecha_fin"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="descripcion" class="form-label">
              Descripción <span class="required">*</span>:
            </label>
            <textarea
              id="descripcion"
              v-model="form.descripcion"
              class="form-control"
              required
            ></textarea>
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
  name: "MantenimientoView",
  components: {
    Navegation,
    Nav,
  },
  data() {
    return {
      mantenimientos: [],
      searchQuery: "",
      isOffCanvasOpen: false,
      offCanvasTitle: "",
      form: {
        id_mantenimiento: null,
        fecha_inicio: "",
        fecha_fin: "",
        descripcion: "",
        estado: "",
      },
    };
  },
  computed: {
    filteredMantenimientos() {
      if (!this.searchQuery) {
        return this.mantenimientos;
      }
      const query = this.searchQuery.trim().toLowerCase();
      return this.mantenimientos.filter((mantenimiento) =>
        mantenimiento.descripcion.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchMantenimientos() {
      try {
        const response = await axios.get("http://localhost:4200/mantenimiento");
        this.mantenimientos = response.data;
      } catch (error) {
        console.error("Error al obtener los mantenimientos:", error);
      }
    },
    openOffCanvas(action, mantenimiento = null) {
      if (action === "edit") {
        this.offCanvasTitle = "Editar Mantenimiento";
        this.form = { ...mantenimiento };
        this.isOffCanvasOpen = true;
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    // Función eliminar

    // async handleDeleteClick(id_mantenimiento) {
    //   Swal.fire({
    //     title: '¿Estás seguro?',
    //     text: "¡No podrás revertir esto!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Sí, bórralo!'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       try {
    //         await axios.delete(`http://localhost:4200/mantenimiento/${id_mantenimiento}`);
    //         this.mantenimientos = this.mantenimientos.filter(mantenimiento => mantenimiento.id_mantenimiento !== id_mantenimiento);
    //         Swal.fire('¡Borrado!', 'El mantenimiento ha sido borrado.', 'success');
    //       } catch (error) {
    //         Swal.fire('Error', 'Hubo un error al borrar el mantenimiento.', 'error');
    //         console.error('Error al borrar el mantenimiento:', error);
    //       }
    //     }
    //   });
    // },

    async submitForm() {
      try {
        await axios.put(
          `http://localhost:4200/mantenimiento/${this.form.id_mantenimiento}`,
          this.form
        );
        const index = this.mantenimientos.findIndex(
          (e) => e.id_mantenimiento === this.form.id_mantenimiento
        );
        if (index !== -1) {
          this.mantenimientos[index] = { ...this.form };
          Swal.fire(
            "¡Actualizado!",
            "El mantenimiento ha sido actualizado.",
            "success"
          );
        }
        this.closeOffCanvas();
      } catch (error) {
        Swal.fire("Error", "Hubo un error al actualizar el mantenimiento.", "error");
        console.error("Error al actualizar el mantenimiento:", error);
      }
    },
    redirectToCreateMantenimiento() {
      this.$router.push("/create/Mantenimiento");
    },
  },
  mounted() {
    this.fetchMantenimientos();
  },
};
</script>
<style scoped src="@/assets/styles/mantenimiento/mantenimientoView.css"></style>