<template>
     <div>
          <!-- header sign in -->
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
               <img
                    class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
               />
               <h2
                    class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
               >
                    Sign in to your account
               </h2>
          </div>
          <!-- header sign in -->
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form class="space-y-6" @submit="login">
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
                                   autocomplete="email"
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
                    <!-- btn sign in -->
                    <div>
                         <button
                              :disabled="loading"
                              type="submit"
                              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                         >
                              <ButtonSpinner v-show="loading" />
                              Sign in
                         </button>
                    </div>
                    <!-- btn sign in -->
               </form>

               <!-- register for free -->
               <p class="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    {{ " " }}
                    <router-link
                         :to="{ name: 'Register' }"
                         class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                         >Register for free
                    </router-link>
               </p>
               <!-- register for free -->
          </div>
     </div>
</template>
<script setup>
import store from "../store";
import ButtonSpinner from "../components/extra_components/ButtonSpinner.vue";
// third party
import { toast, useRouter, ref } from "../imports";

// declaring variables
const router = useRouter();
const loading = ref(false);
const user = {
     email: "",
     password: "",
};

// login
function login(ev) {
     ev.preventDefault();
     loading.value = true;
     store.dispatch("login", user)
          .then((res) => {
               loading.value = false;
               toast.success("Welcome " + res.user.name);
               router.push({ name: "MyTasks" });
          })
          .catch((err) => {
               loading.value = false;
               let msg = err?.response.data.message
                    ? err.response.data.message
                    : err.response.data.error;
               toast.error(msg);
          });
}
</script>
