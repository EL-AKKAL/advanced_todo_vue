<template>
     <div>
          <!-- header register -->
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
               <img
                    class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
               />
               <h2
                    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
               >
                    Register for free
               </h2>
          </div>
          <!-- header register -->
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form class="space-y-6" @submit="register">
                    <!-- name -->
                    <div>
                         <label
                              for="email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Full Name</label
                         >
                         <div class="mt-2">
                              <input
                                   v-model="user.name"
                                   id="name"
                                   name="name"
                                   type="text"
                                   autocomplete="current-name"
                                   required=""
                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                         </div>
                    </div>
                    <!-- name -->
                    <!-- email -->
                    <div>
                         <label
                              for="email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Email address</label
                         >
                         <div class="mt-2">
                              <input
                                   v-model="user.email"
                                   id="email"
                                   name="email"
                                   type="email"
                                   autocomplete="current-email"
                                   required=""
                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                         </div>
                    </div>
                    <!-- email -->
                    <!-- password -->
                    <div>
                         <div class="flex items-center justify-between">
                              <label
                                   for="password"
                                   class="block text-sm font-medium leading-6 text-gray-900"
                                   >Password</label
                              >
                         </div>
                         <div class="mt-2">
                              <input
                                   v-model="user.password"
                                   id="password"
                                   name="password"
                                   type="password"
                                   autocomplete="current-password"
                                   required=""
                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                         </div>
                    </div>
                    <!-- password -->
                    <!-- password confirmation -->
                    <div>
                         <div class="flex items-center justify-between">
                              <label
                                   for="password_confirmation"
                                   class="block text-sm font-medium leading-6 text-gray-900"
                                   >Password Confirmation</label
                              >
                         </div>
                         <div class="mt-2">
                              <input
                                   v-model="user.password_confirmation"
                                   id="password_confirmation"
                                   name="password_confirmation"
                                   type="password"
                                   autocomplete="current-password_confirmation"
                                   required=""
                                   class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                         </div>
                    </div>
                    <!-- password confirmation -->
                    <!-- btn sign up -->
                    <div>
                         <button
                              :disabled="loading"
                              type="submit"
                              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                         >
                              <ButtonSpinner v-show="loading" />
                              Sign Up
                         </button>
                    </div>
                    <!-- btn sign up -->
               </form>

               <!-- already have account -->
               <p class="mt-10 text-center text-sm text-gray-500">
                    Already have an account?
                    {{ " " }}
                    <router-link
                         :to="{ name: 'Login' }"
                         class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                         >Sign In here
                    </router-link>
               </p>
               <!-- already have account -->
          </div>
     </div>
</template>
<script setup>
import store from "../store";
import ButtonSpinner from "../components/extra_components/ButtonSpinner.vue";
import { toast, ref, useRouter } from "../imports";

// declaring variables
const router = useRouter();
const loading = ref(false);
const user = {
     name: "",
     email: "",
     password: "",
     password_confirmation: "",
};
// register
function register(ev) {
     ev.preventDefault();
     loading.value = true;
     store.dispatch("register", user)
          .then(() => {
               toast.success("Account Created successfully");
               loading.value = false;
               router.push({
                    name: "MyTasks",
               });
          })
          .catch((err) => {
               loading.value = false;
               let msg = err.response.data.message
                    ? err.response.data.message
                    : err.response.data.error;
               toast.error(msg);
          });
}
</script>
