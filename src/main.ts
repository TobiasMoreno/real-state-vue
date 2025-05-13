import "./assets/base.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";

import "@/plugins/axios";
import "@/plugins/firebase";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount("#app");
