import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MyTasks from "../views/MyTasks.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import TaskForm from "../views/TaskForm.vue";
import TaskShow from "../views/TaskShow.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";
const routes = [
     {
          path: "/",
          redirect: "/mytasks",
          component: DefaultLayout,
          meta: { requiresAuth: true },
          children: [
               {
                    path: "/mytasks",
                    name: "MyTasks",
                    component: MyTasks,
               },
               {
                    path: "/tasks/create",
                    name: "TaskCreate",
                    component: TaskForm,
               },
               {
                    path: "/tasks/edit/:id",
                    name: "TaskEdit",
                    component: TaskForm,
               },
               {
                    path: "/tasks/:id",
                    name: "TaskShow",
                    component: TaskShow,
               },
          ],
     },
     {
          path: "/auth",
          name: "Auth",
          redirect: "/login",
          component: AuthLayout,
          meta: { isGuest: true },
          children: [
               {
                    path: "/login",
                    name: "Login",
                    component: Login,
               },
               {
                    path: "/register",
                    name: "Register",
                    component: Register,
               },
          ],
     },
];

const router = createRouter({
     history: createWebHistory(),
     routes,
});
router.beforeEach((to, from, next) => {
     if (to.meta.requiresAuth && !store.state.user.token) {
          next({ name: "Login" });
     } else if (store.state.user.token && to.meta.isGuest) {
          next({ name: "MyTasks" });
     } else {
          next();
     }
});
export default router;
