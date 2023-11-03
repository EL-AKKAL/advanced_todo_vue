<template>
     <div>
          <header class="bg-bgColor">
               <div
                    class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex md:flex-row flex-col md:items-center md:justify-between"
               >
                    <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                         Dashboard
                    </h1>
                    <div
                         class="flex gap-4 items-center justify-center md:mt-0 mt-2"
                    >
                         <!-- sort by -->
                         <HeadlessUI.Combobox v-model="selectedSort">
                              <div class="relative mt-1">
                                   <div
                                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                                   >
                                        <input
                                             class="w-full border-none py-2 pl- pr-2 text-sm leading-5 text-gray-900 focus:ring-0"
                                             disabled="true"
                                             v-model="selectedSort.title"
                                        />
                                        <HeadlessUI.ComboboxButton
                                             class="absolute inset-y-0 right-0 flex items-center pr-2"
                                        >
                                             <ChevronUpDownIcon
                                                  class="h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                             />
                                        </HeadlessUI.ComboboxButton>
                                   </div>
                                   <HeadlessUI.TransitionRoot
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                   >
                                        <HeadlessUI.ComboboxOptions
                                             class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                        >
                                             <HeadlessUI.ComboboxOption
                                                  v-for="sort in sorts"
                                                  as="template"
                                                  :key="sort.id"
                                                  :value="sort"
                                                  v-slot="{
                                                       selectedSort,
                                                       active,
                                                  }"
                                                  @click="sortList(sort.query)"
                                             >
                                                  <li
                                                       class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                                                       :class="{
                                                            'bg-teal-600 text-white':
                                                                 active,
                                                            'text-gray-900':
                                                                 !active,
                                                       }"
                                                  >
                                                       <span
                                                            class="block truncate"
                                                            :class="{
                                                                 'font-medium':
                                                                      selectedSort,
                                                                 'font-normal':
                                                                      !selectedSort,
                                                            }"
                                                       >
                                                            {{ sort.title }}
                                                       </span>
                                                  </li>
                                             </HeadlessUI.ComboboxOption>
                                        </HeadlessUI.ComboboxOptions>
                                   </HeadlessUI.TransitionRoot>
                              </div>
                         </HeadlessUI.Combobox>
                         <!-- sort by -->
                         <!-- filter by -->
                         <HeadlessUI.Combobox v-model="selectedFilter">
                              <div class="relative mt-1">
                                   <div
                                        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                                   >
                                        <input
                                             v-model="selectedFilter.title"
                                             disabled="true"
                                             class="w-full border-none py-2 pl-3 pr-2 text-sm leading-5 text-gray-900 focus:ring-0"
                                        />
                                        <HeadlessUI.ComboboxButton
                                             class="absolute inset-y-0 right-0 flex items-center pr-2"
                                        >
                                             <ChevronUpDownIcon
                                                  class="h-5 w-5 text-gray-400"
                                                  aria-hidden="true"
                                             />
                                        </HeadlessUI.ComboboxButton>
                                   </div>
                                   <HeadlessUI.TransitionRoot
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                   >
                                        <HeadlessUI.ComboboxOptions
                                             class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                        >
                                             <HeadlessUI.ComboboxOption
                                                  v-for="filter in filters"
                                                  as="template"
                                                  :key="filter.id"
                                                  :value="filter"
                                                  v-slot="{
                                                       selectedFilter,
                                                       active,
                                                  }"
                                                  @click="
                                                       filterList(filter.query)
                                                  "
                                             >
                                                  <li
                                                       class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                                                       :class="{
                                                            'bg-teal-600 text-white':
                                                                 active,
                                                            'text-gray-900':
                                                                 !active,
                                                       }"
                                                  >
                                                       <span
                                                            class="block truncate"
                                                            :class="{
                                                                 'font-medium':
                                                                      selectedFilter,
                                                                 'font-normal':
                                                                      !selectedFilter,
                                                            }"
                                                       >
                                                            {{ filter.title }}
                                                       </span>
                                                  </li>
                                             </HeadlessUI.ComboboxOption>
                                        </HeadlessUI.ComboboxOptions>
                                   </HeadlessUI.TransitionRoot>
                              </div>
                         </HeadlessUI.Combobox>
                         <!-- filter by -->
                         <!-- add new -->
                         <router-link
                              :to="{
                                   name: 'TaskCreate',
                              }"
                              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 h-fit rounded md:px-4 px-2 justify-center inline-flex items-center"
                         >
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke-width="1.5"
                                   stroke="currentColor"
                                   class="fill-current w-4 h-4 sm:mr-2 mr-0"
                              >
                                   <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                   />
                              </svg>

                              <span class="sm:inline-block hidden"
                                   >Add New</span
                              >
                         </router-link>
                         <!-- add new -->
                    </div>
               </div>
          </header>
          <main>
               <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 !px-6">
                    <Spinner v-if="loading" />
                    <ul
                         role="list"
                         class="divide-y divide-gray-100 bg-transparent"
                    >
                         <!-- task list item -->
                         <TaskListItem
                              v-for="task in tasks"
                              :key="task.id"
                              :task="task"
                              @delete="deleteTask(task)"
                         />
                         <!-- task list item -->
                         <!-- pagination -->
                         <div class="flex justify-center mt-4">
                              <nav
                                   class="relative z-0 inline-flex justify-center rounded-md shadow-sm"
                                   aria-label="Pagination"
                              >
                                   <a
                                        v-for="(link, i) of links"
                                        :key="i"
                                        :disabled="!link.url"
                                        v-html="link.label"
                                        @click="getForPage(link)"
                                        aria-current="page"
                                        class="relative cursor-pointer text-sm inline-flex justify-center px-4 py-2 border transition ease-in-out duration-300 font-medium whitespace-nowrap"
                                        :class="[
                                             link.active
                                                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100 ',
                                             i === 0 ? 'rounded-l-md' : '',
                                             i === links.length - 1
                                                  ? 'rounded-r-md'
                                                  : '',
                                        ]"
                                   ></a>
                              </nav>
                         </div>
                         <!-- pagination -->
                    </ul>
               </div>
          </main>
     </div>
</template>

<script setup>
import store from "../store";
import TaskListItem from "../components/TaskListItem.vue";
import Spinner from "../components/extra_components/Spinner.vue";
import {
     toast,
     HeadlessUI,
     ref,
     computed,
     ChevronUpDownIcon,
} from "../imports";

// declaring variables
const sorts = [
     { id: 1, title: "No Sort", query: "" },
     { id: 2, title: "Nearest Due Date", query: "date asc" },
     { id: 3, title: "Farest Due Date", query: "date desc" },
     { id: 4, title: "Title (a-z)", query: "title asc" },
     { id: 5, title: "Title (z-a)", query: "date desc" },
];
let selectedSort = ref(sorts[0]);
const filters = [
     { id: 1, title: "No Filter", query: "" },
     { id: 2, title: "Status : completed", query: "completed" },
     { id: 3, title: "Status : in-progress", query: "in-progress" },
];
let selectedFilter = ref(filters[0]);
let tasks = computed(() => store.state.tasks.data);
let links = computed(() => store.state.tasks.links);
let loading = computed(() => store.state.tasks.loading);

// get tasks on page load
store.dispatch("getTasks");

// filter results
function filterList(query) {
     selectedFilter.value =
          filters.find((filter) => filter.query === query) || filters[0];
     store.dispatch("getTasks", {
          filter: selectedFilter.value.query,
          sort: selectedSort.value.query,
     });
}

// sort results
function sortList(query) {
     selectedSort.value =
          sorts.find((sort) => sort.query === query) || sorts[0];
     store.dispatch("getTasks", {
          filter: selectedFilter.value.query,
          sort: selectedSort.value.query,
     });
}

// delete task
function deleteTask(task) {
     if (
          confirm(
               `Are you sure you want to delete task '${task.title}' ? operation can't be undone!!`
          )
     ) {
          store.dispatch("deleteTask", task.id).then(() => {
               store.dispatch("getTasks");
               toast.success("Task Deleted successfully");
          });
     }
}

// pagination
function getForPage(link) {
     if (!link.url || link.active) {
          return;
     }
     store.dispatch("getTasks", { url: link.url });
}
</script>
