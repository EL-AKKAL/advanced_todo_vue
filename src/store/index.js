import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
     state: {
          user: {
               data: {},
               token: sessionStorage.getItem("TOKEN"),
          },
          tasks: {
               loading: false,
               data: [],
               links: [],
          },
          currentTask: {
               loading: false,
               data: {},
          },
     },
     modules: {},
     mutations: {
          logout: (state) => {
               state.user.data = {};
               state.user.token = null;
               sessionStorage.removeItem("TOKEN");
          },
          setUser: (state, userData) => {
               state.user.data = userData.user;
               state.user.token = userData.token;
               sessionStorage.setItem("TOKEN", userData.token);
          },
          setTasks: (state, tasks) => {
               state.tasks.data = tasks.data;
               state.tasks.links = tasks.meta.links;
          },
          setTasksLoading: (state, loading) => {
               state.tasks.loading = loading;
          },
          setCurrentTaskLoading: (state, loading) => {
               state.currentTask.loading = loading;
          },
          setCurrentTask: (state, task) => {
               state.currentTask.data = task.data;
          },
     },
     getters: {},
     actions: {
          register({ commit }, user) {
               return axiosClient.post("/register", user).then(({ data }) => {
                    store.commit("setUser", data);
                    // in case we need this data on login page in the future
                    return data;
               });
          },
          login({ commit }, user) {
               return axiosClient.post("/login", user).then(({ data }) => {
                    store.commit("setUser", data);
                    // in case we need this data on login page in the future
                    return data;
               });
          },
          logout({ commit }) {
               return axiosClient.post("/logout").then((response) => {
                    commit("logout");
                    return response;
               });
          },
          getTasks({ commit }, { url = null, filter = "", sort = "" } = {}) {
               url = url || "/tasks";
               commit("setTasksLoading", true);

               return axiosClient
                    .get(url, { params: { filter, sort } })
                    .then((res) => {
                         commit("setTasksLoading", false);
                         commit("setTasks", res.data);
                         return res;
                    });
          },
          saveTask({ commit }, task) {
               let response;
               if (task.id) {
                    response = axiosClient
                         .put(`/tasks/${task.id}`, task)
                         .then((res) => {
                              commit("setCurrentTask", res.data);
                              return res;
                         });
               } else {
                    response = axiosClient.post("/tasks", task).then((res) => {
                         commit("setCurrentTask", res.data);
                         return res;
                    });
               }
               return response;
          },

          getTask({ commit }, id) {
               commit("setCurrentTaskLoading", true);
               return axiosClient
                    .get(`/tasks/${id}`)
                    .then((result) => {
                         commit("setCurrentTask", result.data);
                         commit("setCurrentTaskLoading", false);

                         return result;
                    })
                    .catch((err) => {
                         commit("setCurrentTaskLoading", false);
                         throw err;
                    });
          },
          deleteTask({}, id) {
               return axiosClient.delete(`/tasks/${id}`);
          },
     },
});
export default store;
