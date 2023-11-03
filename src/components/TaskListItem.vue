<template>
     <li
          class="flex justify-between gap-x-6 py-5 mb-2 shadow bg-white rounded px-5"
     >
          <div class="flex min-w-0 gap-x-4">
               <div class="min-w-0 flex-auto">
                    <p class="text-md font-bold leading-6 text-gray-900">
                         {{ task.title }}
                         <StatusDisplay :status="task.status" />
                    </p>
                    <p class="mt-3 truncate text-xs leading-5 text-gray-500">
                         Due on {{ task.due_date }}
                    </p>
               </div>
          </div>
          <div class="shrink-0 flex flex-row items-center justify-center">
               <router-link
                    :to="{
                         name: 'TaskShow',
                         params: { id: task.id },
                    }"
                    class="text-sm text-gray-700 font-semibold border-2 flex items-center justify-center border-gray-300 rounded-lg p-2 sm:py-2 sm:px-3 h-fit hover:border-gray-400 hover:text-gray-900"
               >
                    <span class="inline-flex sm:hidden leading-none m-0 p-0"
                         ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="w-4 h-4"
                         >
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path
                                   fill-rule="evenodd"
                                   d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                   clip-rule="evenodd"
                              />
                         </svg>
                    </span>
                    <span class="hidden sm:inline">View task</span>
               </router-link>
               <div class="w-auto text-right">
                    <HeadlessUI.Menu as="div" class="relative inline-block">
                         <div>
                              <HeadlessUI.MenuButton
                                   class="inline-flex w-full justify-center bg-transparent px-4 py-2 text-white hover:bg-opacity-30"
                              >
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 text-gray-500 hover:text-gray-900"
                                   >
                                        <path
                                             stroke-linecap="round"
                                             stroke-linejoin="round"
                                             d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                        />
                                   </svg>
                              </HeadlessUI.MenuButton>
                         </div>

                         <transition
                              enter-active-class="transition duration-100 ease-out"
                              enter-from-class="transform scale-95 opacity-0"
                              enter-to-class="transform scale-100 opacity-100"
                              leave-active-class="transition duration-75 ease-in"
                              leave-from-class="transform scale-100 opacity-100"
                              leave-to-class="transform scale-95 opacity-0"
                         >
                              <HeadlessUI.MenuItems
                                   class="absolute z-30 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                   <div class="px-1 py-1">
                                        <HeadlessUI.MenuItem
                                             v-slot="{ active }"
                                        >
                                             <router-link
                                                  :to="{
                                                       name: 'TaskEdit',
                                                       params: {
                                                            id: task.id,
                                                       },
                                                  }"
                                                  :class="[
                                                       active
                                                            ? 'bg-violet-500 text-white'
                                                            : 'text-gray-900',
                                                       'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                  ]"
                                             >
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       stroke-width="1.5"
                                                       stroke="currentColor"
                                                       class="mr-2 h-5 w-5 text-violet-400"
                                                  >
                                                       <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                       />
                                                  </svg>

                                                  Edit
                                             </router-link>
                                        </HeadlessUI.MenuItem>
                                   </div>

                                   <div class="px-1 py-1">
                                        <HeadlessUI.MenuItem
                                             v-slot="{ active }"
                                        >
                                             <button
                                                  @click="emit('delete', task)"
                                                  :class="[
                                                       active
                                                            ? 'bg-violet-500 text-white'
                                                            : 'text-gray-900',
                                                       'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                                  ]"
                                             >
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       stroke-width="1.5"
                                                       stroke="currentColor"
                                                       class="mr-2 h-5 w-5 text-violet-400"
                                                  >
                                                       <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                       />
                                                  </svg>

                                                  Delete
                                             </button>
                                        </HeadlessUI.MenuItem>
                                   </div>
                              </HeadlessUI.MenuItems>
                         </transition>
                    </HeadlessUI.Menu>
               </div>
          </div>
     </li>
</template>

<script setup>
import StatusDisplay from "./extra_components/StatusDisplay.vue";
// third party
import { HeadlessUI } from "../imports";
// local components

// vars
const { task } = defineProps({
     task: Object,
});
const emit = defineEmits(["delete"]);
</script>
