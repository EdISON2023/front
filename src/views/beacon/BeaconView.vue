<template>
    <Navegation />
    <div class="container">
      <Nav />
      <div class="header">
        <h2>Gestor Beacon</h2>
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="Buscar..." />
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><i class="fas fa-calendar-alt"></i> Fecha de Creación</th>
              <th><i class="fas fa-id-badge"></i> UUID</th>
              <th><i class="fas fa-map-marker-alt"></i> Latitud</th>
              <th><i class="fas fa-map-marker-alt"></i> Longitud</th>
              <th><i class="fas fa-clock"></i> Última Actualización</th>
              <th><i class="fas fa-circle text-danger"></i> Estado</th>
              <th><i class="fas fa-cogs"></i> Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredBeacons.length === 0">
              <td colspan="7" class="text-center">
                Sin registros de Beacon
              </td>
            </tr>
            <tr v-for="beacon in filteredBeacons" :key="beacon.id_beacon">
              <td>{{ beacon.fecha_creacion }}</td>
              <td>{{ beacon.uu_id }}</td>
              <td>{{ beacon.latitud }}</td>
              <td>{{ beacon.longitud }}</td>
              <td>{{ beacon.ultima_actualizacion }}</td>
              <td>{{ beacon.estado }}</td>
              <td class="actions">
                <i class="fas fa-edit" @click="openOffCanvas('edit', beacon)"></i>
                <!-- <i class="fas fa-trash-alt" @click="handleDeleteClick(beacon.id_beacon)"></i> -->
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <p>{{ filteredBeacons.length }} resultados encontrados</p>
          <button class="add-btn" @click="redirectToCreateBeacon">Agregar</button>
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
              <label for="uu_id" class="form-label">UUID <span class="required">*</span>:</label>
              <input type="text" id="uu_id" v-model="form.uu_id" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="fecha_creacion" class="form-label">Fecha de Creación <span class="required">*</span>:</label>
              <input type="date" id="fecha_creacion" v-model="form.fecha_creacion" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="latitud" class="form-label">Latitud <span class="required">*</span>:</label>
              <input type="number" id="latitud" v-model="form.latitud" class="form-control" required step="any" />
            </div>
            <div class="form-group">
              <label for="longitud" class="form-label">Longitud <span class="required">*</span>:</label>
              <input type="number" id="longitud" v-model="form.longitud" class="form-control" required step="any" />
            </div>
            <div class="form-group">
              <label for="ultima_actualizacion" class="form-label">Última Actualización <span class="required">*</span>:</label>
              <input type="datetime-local" id="ultima_actualizacion" v-model="form.ultima_actualizacion" class="form-control" required />
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
  import axios from "axios";
  
  export default {
    name: "BeaconView",
    components: {
      Navegation,
      Nav,
    },
    data() {
      return {
        beacons: [],
        searchQuery: "",
        isOffCanvasOpen: false,
        offCanvasTitle: "",
        form: {
          id_beacon: null,
          uu_id: "",
          fecha_creacion: "",
          latitud: "",
          longitud: "",
          ultima_actualizacion: "",
          estado: "",
        },
      };
    },
    computed: {
      filteredBeacons() {
        if (!this.searchQuery) {
          return this.beacons;
        }
        const query = this.searchQuery.trim().toLowerCase();
        return this.beacons.filter((beacon) =>
          beacon.uu_id.toLowerCase().includes(query)
        );
      },
    },
    methods: {
      async fetchBeacons() {
        try {
          const response = await axios.get("http://localhost:4200/beacon");
          this.beacons = response.data;
        } catch (error) {
          console.error("Error al obtener los beacons:", error);
        }
      },
      openOffCanvas(action, beacon = null) {
        if (action === "edit") {
          this.offCanvasTitle = "Editar Beacon";
          this.form = { ...beacon };
          this.isOffCanvasOpen = true;
        }
      },
      closeOffCanvas() {
        this.isOffCanvasOpen = false;
      },
      // Función eliminar
  
      // async handleDeleteClick(id_beacon) {
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
      //         await axios.delete(`http://localhost:4200/beacon/${id_beacon}`);
      //         this.beacons = this.beacons.filter(beacon => beacon.id_beacon !== id_beacon);
      //         Swal.fire('¡Borrado!', 'El beacon ha sido borrado.', 'success');
      //       } catch (error) {
      //         Swal.fire('Error', 'Hubo un error al borrar el beacon.', 'error');
      //         console.error('Error al borrar el beacon:', error);
      //       }
      //     }
      //   });
      // },
  
      async submitForm() {
        try {
          await axios.put(`http://localhost:4200/beacon/${this.form.id_beacon}`, this.form);
          const index = this.beacons.findIndex((b) => b.id_beacon === this.form.id_beacon);
          if (index !== -1) {
            this.beacons[index] = { ...this.form };
            Swal.fire("¡Actualizado!", "El beacon ha sido actualizado.", "success");
          }
          this.closeOffCanvas();
        } catch (error) {
          Swal.fire("Error", "Hubo un error al actualizar el beacon.", "error");
          console.error("Error al actualizar el beacon:", error);
        }
      },
      redirectToCreateBeacon() {
        this.$router.push("/create/Beacon");
      },
    },
    mounted() {
      this.fetchBeacons();
    },
  };
  </script>
  
  <style scoped src="@/assets/styles/beacon/beacon.css"></style>
  