import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//Import RUTA
import RutaNew from "../views/ruta/RutaNew.vue";
import RutaEdit from "@/views/ruta/RutaEdit.vue";
import RutaView from "@/views/ruta/RutaView.vue";

//Import Beacon
import BeaconNew from "@/views/beacon/BeaconNew.vue";
import BeaconView from "@/views/beacon/BeaconView.vue";

//Import MENSAJE PERSONALIZADO
import MensajePersonalizadoEdit from "@/views/mensajePersonalizado/MensajePersonalizadoEdit.vue";
import MensajePersonalizadoView from "@/views/mensajePersonalizado/MensajePersonalizadoView.vue";
import MensajePersonalizadoNew from "@/views/mensajePersonalizado/MensajePersonalizadoNew.vue";

//Import MENSAJE PERSONALIZADO
import GuiaVozEdit from "@/views/guiaVoz/guiaVozEdit.vue";
import GuiaVozNew from "@/views/guiaVoz/guiaVozNew.vue";
import GuiaVozView from "@/views/guiaVoz/guiaVozView.vue";

//Import PUNTO DE INTERES
import PuntoInteresNew from "@/views/puntoInteres/PuntoInteresNew.vue";
import PuntoInteresEdit from "@/views/puntoInteres/PuntoInteresEdit.vue";
import PuntoInteresView from "@/views/puntoInteres/PuntoInteresView.vue";

//Import ESTACION DE METRO
import EstacionMetroNew from "@/views/estacionMetro/EstacionMetroNew.vue";
import EstacionMetroEdit from "@/views/estacionMetro/EstacionMetroEdit.vue";
import EstacionMetroView from "@/views/estacionMetro/EstacionMetroView.vue";

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

  //Route RUTA
  {
    path: "/create/Ruta",
    name: "createRuta",
    component: RutaNew,
  },
  {
    path: "/edit/Ruta/:id",
    name: "editRuta",
    component: RutaEdit,
  },
  {
    path: "/view/Ruta",
    name: "viewRuta",
    component: RutaView,
  },

  //Route MENSAJE PERSONALIZADO
  {
    path: "/create/MensajePersonalizado",
    name: "createMensajePersonalizado",
    component: MensajePersonalizadoNew,
  },
  {
    path: "/editMensaje/Personalizado/:id",
    name: "editMensajePersonalizado",
    component: MensajePersonalizadoEdit,
  },
  {
    path: "/viewMensaje/Personalizado",
    name: "viewMensajePersonalizado",
    component: MensajePersonalizadoView,
  },

  //Route GUIA DE VOZ
  {
    path: "/create/GuiaVoz",
    name: "createGuiaVoz",
    component: GuiaVozNew,
  },
  {
    path: "/editGuia/Voz/:id",
    name: "editGuiaVoz",
    component: GuiaVozEdit,
  },
  {
    path: "/view/GuiaVoz",
    name: "viewGuiaVoz",
    component: GuiaVozView,
  },

  //Route PUNTO DE INTERES
  {
    path: "/create/PuntoInteres",
    name: "createPuntoInteres",
    component: PuntoInteresNew,
  },
  {
    path: "/edit/PuntoInteres/:id",
    name: "editPuntoInteres",
    component: PuntoInteresEdit,
  },
  {
    path: "/view/PuntoInteres",
    name: "viewPuntoInteres",
    component: PuntoInteresView,
  },

  //Route ESTACION DE METRO
  {
    path: "/create/EstacionMetro",
    name: "createEstacionMetro",
    component: EstacionMetroNew,
  },
  {
    path: "/edit/EstacionMetro/:id",
    name: "editEstacionMetro",
    component: EstacionMetroEdit,
  },
  {
    path: "/view/EstacionMetro",
    name: "viewEstacionMetro",
    component: EstacionMetroView,
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
