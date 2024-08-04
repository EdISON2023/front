import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//Import Alquiler
import AlquilerNew from "../views/alquiler/AlquilerNew.vue";
import AlquilerView from "@/views/alquiler/AlquilerView.vue";

//Import Beacon
import BeaconNew from "@/views/beacon/BeaconNew.vue";
import BeaconView from "@/views/beacon/BeaconView.vue";

//Import Mantenimiento
import MantenimientoView from "@/views/mantenimiento/MantenimientoView.vue";
import MantenimientoNew from "@/views/mantenimiento/MantenimientoNew.vue";

//Import PUNTO DE INTERES
import BicicletaNew from "@/views/bicicleta/BicicletaNew.vue";
import BicicletaView from "@/views/bicicleta/BicicletaView.vue";
//Import ESTACION DE METRO
import EstacionNew from "@/views/estacion/EstacionNew.vue";
import EstacionView from "@/views/estacion/EstacionView.vue";

//Import USER
import UserNew from "@/views/user/UserNew";
import UserEdit from "@/views/user/UserEdit";
import UserView from "@/views/user/UserView";

//Import DASHBOARD
import Dashboard from "@/views/dashboard/Dashboard.vue";

//Import REGISTRO
import Register from "@/views/register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  //Route Alquiler
  {
    path: "/create/Alquiler",
    name: "createAlquiler",
    component: AlquilerNew,
  },
  {
    path: "/view/Alquiler",
    name: "viewAlquiler",
    component: AlquilerView
  },

  //Route Mantenimiento
  {
    path: "/create/Mantenimiento",
    name: "createMantenimiento",
    component:MantenimientoNew,
  },
  {
    path: "/view/Mantenimiento",
    name: "viewMantenimiento",
    component: MantenimientoView
  },

  //Route Bicicleta
  {
    path: "/create/Bicicleta",
    name: "createBicicleta",
    component: BicicletaNew,
  },
  {
    path: "/view/Bicicleta",
    name: "viewBicicleta",
    component: BicicletaView,
  },

  //Route ESTACION 
  {
    path: "/create/Estacion",
    name: "createEstacion",
    component: EstacionNew,
  },

  {
    path: "/view/Estacion",
    name: "viewEstacion",
    component: EstacionView,
  },

  //Route Beacon
  {
    path:"/view/Beacon",
    name:"viewBeacon",
    component:BeaconView,
  },
  {
    path:"/create/Beacon",
    name:"createBeacon",
    component:BeaconNew,
  },


  //Route USER
  {
    path: "/create/User",
    name: "createUser",
    component: UserNew,
  },
  {
    path: "/edit/User/:id",
    name: "editUser",
    component: UserEdit,
  },
  {
    path: "/view/User",
    name: "viewUser",
    component: UserView,
  },
  //Route DASHBOARD
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  //Route REGISTRO
  {
    path: "/register",
    name: "register",
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
