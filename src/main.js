import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
     position: "bottom-right",
     timeout: 3968,
     closeOnClick: true,
     pauseOnFocusLoss: true,
     pauseOnHover: true,
     draggable: true,
     draggablePercent: 0.6,
     showCloseButtonOnHover: false,
     hideProgressBar: true,
     closeButton: "button",
     icon: true,
     rtl: false,
};
createApp(App).use(store).use(router).use(Toast, options).mount("#app");
