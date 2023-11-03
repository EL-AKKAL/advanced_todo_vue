<template>
     <div class="h-full">
          <header class="bg-bgColor">
               <div
                    class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between"
               >
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                         Task Overview
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
          <main>
               <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 !px-6">
                    <Spinner v-if="loading" />
                    <div
                         class="bg-white max-w-7xl shadow-lg overflow-hidden sm:rounded-lg"
                    >
                         <div class="px-4 py-5 sm:px-6">
                              <h3
                                   class="text-lg sm:text-2xl mb-3 leading-6 font-medium text-gray-900"
                              >
                                   {{ modal.title }}
                              </h3>
                              <p
                                   class="mt-1 max-w-2xl sm:text-md text-gray-500"
                              >
                                   Created
                                   {{ moment(modal.created_at).fromNow() }}
                              </p>
                         </div>
                         <div class="border-t border-gray-200">
                              <dl>
                                   <!-- title -->
                                   <div
                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                   >
                                        <dt
                                             class="text-lg font-medium text-gray-500"
                                        >
                                             Title
                                        </dt>
                                        <dd
                                             class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2"
                                        >
                                             {{ modal.title }}
                                        </dd>
                                   </div>
                                   <!-- title -->

                                   <!-- description -->
                                   <div
                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                   >
                                        <dt
                                             class="text-lg font-medium text-gray-500"
                                        >
                                             Description
                                        </dt>
                                        <dd
                                             class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2"
                                        >
                                             {{ modal.description }}
                                        </dd>
                                   </div>
                                   <!-- description -->
                                   <!-- due date -->
                                   <div
                                        class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                   >
                                        <dt
                                             class="text-lg font-medium text-gray-500"
                                        >
                                             Due Date
                                        </dt>
                                        <dd
                                             class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2"
                                        >
                                             {{ modal.due_date }}
                                        </dd>
                                   </div>
                                   <!-- due date -->

                                   <!-- status -->
                                   <div
                                        class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                   >
                                        <dt
                                             class="text-lg font-medium text-gray-500"
                                        >
                                             Status
                                        </dt>
                                        <dd
                                             class="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2"
                                        >
                                             <StatusDisplay
                                                  :status="modal.status"
                                             />
                                        </dd>
                                   </div>
                                   <!-- status -->
                              </dl>
                         </div>
                    </div>
               </div>
          </main>
     </div>
</template>

<script setup>
import store from "../store";
import Spinner from "../components/extra_components/Spinner.vue";
import StatusDisplay from "../components/extra_components/StatusDisplay.vue";
import { ref, watch, computed, moment, useRoute } from "../imports";

// declaring variables
const route = useRoute();
let loading = computed(() => store.state.currentTask.loading);
let modal = ref({
     id: null,
     title: "",
     description: "",
     status: false,
     created_at: null,
     due_date: null,
});

// watch current task
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
</script>
