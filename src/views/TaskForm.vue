<template>
     <div>
          <!-- header -->
          <header class="bg-bgColor">
               <div
                    class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between"
               >
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                         {{ route.params.id ? "Edit Task" : "Create Task" }}
                    </h1>
                    <router-link
                         class="text-gray-600 font-medium flex items-center justify-center gap-1 hover:text-gray-700"
                         :to="{ name: 'MyTasks' }"
                         ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                         >
                              <path
                                   stroke-linecap="round"
                                   stroke-linejoin="round"
                                   d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                         </svg>

                         Back
                    </router-link>
               </div>
          </header>
          <!-- header -->
          <main>
               <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 !px-6">
                    <Spinner v-if="loading" />
                    <form class="space-y-6" @submit.prevent="saveTask">
                         <!-- Title -->
                         <div>
                              <label
                                   for="title"
                                   class="block text-md font-medium leading-4 text-gray-900"
                                   >Title</label
                              >
                              <div class="mt-2">
                                   <input
                                        v-model="modal.title"
                                        id="title"
                                        name="title"
                                        type="text"
                                        autocomplete="task_title"
                                        required=""
                                        placeholder="Ex : Doctor Appointement"
                                        class="text-md block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   />
                              </div>
                         </div>
                         <!-- Title -->
                         <!-- Description -->
                         <div>
                              <div class="flex items-center justify-between">
                                   <label
                                        for="description"
                                        class="block text-md font-medium leading-6 text-gray-900"
                                        >Description</label
                                   >
                              </div>
                              <div class="mt-2">
                                   <textarea
                                        id="description"
                                        v-model="modal.description"
                                        placeholder="Describe your task"
                                        name="description"
                                        rows="3"
                                        class="text-md block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   ></textarea>
                              </div>
                         </div>
                         <!-- Description -->
                         <!-- Due Date -->
                         <div>
                              <label
                                   for="due_date"
                                   class="block text-md font-medium leading-6 text-gray-900"
                                   >Due Date</label
                              >

                              <input
                                   type="date"
                                   name="due_date"
                                   id="due_date"
                                   v-model="modal.due_date"
                                   class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              />
                         </div>
                         <!-- Due Date -->
                         <!-- Status -->
                         <div>
                              <label
                                   for="due_date"
                                   class="block text-md font-medium leading-6 text-gray-900"
                                   >Status</label
                              >

                              <div class="flex items-start justify-start gap-2">
                                   <HeadlessUI.Switch
                                        v-model="modal.status"
                                        :class="
                                             modal.status
                                                  ? 'bg-green-600'
                                                  : 'bg-teal-700'
                                        "
                                        class="relative inline-flex h-[25px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                   >
                                        <span
                                             aria-hidden="true"
                                             :class="
                                                  modal.status
                                                       ? 'translate-x-5'
                                                       : 'translate-x-0'
                                             "
                                             class="pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                                        />
                                   </HeadlessUI.Switch>
                                   <span class="text-gray-800 text-sm">{{
                                        modal.status
                                             ? "Completed "
                                             : "In-progress"
                                   }}</span>
                              </div>
                         </div>
                         <!-- Status -->

                         <!-- Buttons -->
                         <div
                              class="flex sm:flex-row flex-col items-center justify-center gap-3"
                         >
                              <!-- confirm -->
                              <button
                                   type="submit"
                                   class="w-full sm:w-fit text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md border border-transparent text-body-color shadow-card hover:text-primary inline-flex items-center justify-center bg-white py-3 px-6 text-center text-base font-medium"
                              >
                                   <span class="mr-[10px]"
                                        ><svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke-width="1.5"
                                             stroke="currentColor"
                                             width="20"
                                             height="20"
                                        >
                                             <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                             />
                                        </svg>
                                   </span>
                                   Confirm
                              </button>
                              <!-- confirm -->
                              <!-- clear -->
                              <button
                                   type="button"
                                   @click="clearForm"
                                   class="w-full sm:w-fit text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md border border-transparent text-body-color shadow-card hover:text-primary inline-flex items-center justify-center bg-white py-3 px-6 text-center text-base font-medium"
                              >
                                   <span class="mr-[10px]"
                                        ><svg
                                             width="20"
                                             height="20"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke-width="1.5"
                                             stroke="currentColor"
                                        >
                                             <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                             />
                                        </svg>
                                   </span>
                                   Clear
                              </button>
                              <!-- clear -->
                              <!-- cancel -->
                              <router-link
                                   :to="{ name: 'MyTasks' }"
                                   type="button"
                                   class="w-full sm:w-fit text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md border border-transparent text-body-color shadow-card hover:text-primary inline-flex items-center justify-center bg-white py-3 px-6 text-center text-base font-medium"
                              >
                                   <span class="mr-[10px]"
                                        ><svg
                                             width="20"
                                             height="20"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             stroke-width="1.5"
                                             stroke="currentColor"
                                        >
                                             <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                             />
                                        </svg>
                                   </span>
                                   Cancel
                              </router-link>
                              <!-- cancel -->
                         </div>
                         <!-- Buttons -->
                    </form>
               </div>
          </main>
     </div>
</template>
<script setup>
import store from "../store";
import {
     useRoute,
     useRouter,
     ref,
     watch,
     computed,
     toast,
     HeadlessUI,
} from "../imports";

// declaring variables
const route = useRoute();
const router = useRouter();
let loading = computed(() => store.state.currentTask.loading);
let modal = ref({
     id: null,
     title: "",
     description: "",
     status: false,
     due_date: null,
});

// watch the current task
watch(
     () => store.state.currentTask.data,
     (newVal, oldVal) => {
          modal.value = {
               ...JSON.parse(JSON.stringify(newVal)),
          };
     }
);
// if user param exists , get data
if (route.params.id) {
     store.dispatch("getTask", route.params.id);
}

// save task
function saveTask() {
     store.dispatch("saveTask", modal.value)
          .then(({ data }) => {
               toast.success("Task Saved successfully");
               router.push({ name: "TaskShow", params: { id: data.data.id } });
          })
          .catch((err) => {
               toast.error(err.response.data.message);
          });
}
// clear form
function clearForm() {
     modal.value = {
          id: null,
          title: "",
          description: "",
          status: false,
          due_date: null,
     };
}
</script>
