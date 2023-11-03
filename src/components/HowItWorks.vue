<template>
     <HeadlessUI.TransitionRoot appear :show="isOpen" as="template">
          <HeadlessUI.Dialog
               as="div"
               @close="$emit('close')"
               class="relative z-10"
          >
               <ScreenOverlay />

               <div class="fixed inset-0 overflow-y-auto">
                    <div
                         class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                         <HeadlessUI.TransitionChild
                              as="template"
                              enter="duration-300 ease-out"
                              enter-from="opacity-0 scale-95"
                              enter-to="opacity-100 scale-100"
                              leave="duration-200 ease-in"
                              leave-from="opacity-100 scale-100"
                              leave-to="opacity-0 scale-95"
                         >
                              <HeadlessUI.DialogPanel
                                   class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                              >
                                   <!-- dashboard -->
                                   <HeadlessUI.DialogTitle
                                        as="h3"
                                        class="text-base font-bold leading-0 mt-2 text-gray-900"
                                   >
                                        Dashboard :
                                   </HeadlessUI.DialogTitle>
                                   <ul
                                        class="mt-2 list-disc ml-5 text-gray-500 font-medium"
                                   >
                                        <li class="py-1">
                                             Your dashboard displays a list of
                                             tasks you've added.
                                        </li>
                                        <li class="py-1">
                                             To access your account settings,
                                             click on "Account" in the top right
                                             corner.
                                        </li>
                                   </ul>
                                   <!-- dashboard -->
                                   <!-- task management -->
                                   <HeadlessUI.DialogTitle
                                        as="h3"
                                        class="text-base font-bold leading-0 mt-2 text-gray-900"
                                   >
                                        Task Management:
                                   </HeadlessUI.DialogTitle>
                                   <ul
                                        class="mt-2 list-disc ml-5 text-gray-500 font-medium"
                                   >
                                        <li class="py-1">
                                             To Edit / Delete a task, click on
                                             <span
                                                  class="border rounded-md border-gray-300 p-1 font-bold"
                                                  >&#8942;</span
                                             >
                                             to the right of each task.
                                        </li>
                                        <li class="py-1">
                                             You can also click
                                             <span
                                                  class="border border-gray-300 font-semibold p-1 px-2"
                                                  >view task</span
                                             >
                                             on the right of each task to show
                                             its details
                                        </li>
                                   </ul>
                                   <!-- task management -->
                                   <!-- Sorting and Filtering -->
                                   <HeadlessUI.DialogTitle
                                        as="h3"
                                        class="text-base font-bold leading-0 mt-2 text-gray-900"
                                   >
                                        Sorting and Filtering:
                                   </HeadlessUI.DialogTitle>
                                   <ul
                                        class="mt-2 list-disc ml-5 text-gray-500 font-medium"
                                   >
                                        <li class="py-1">
                                             You have the option to sort and
                                             filter your task list.
                                        </li>
                                        <li class="py-1">
                                             Use the comboboxes located next to
                                             the "Add New" button to customize
                                             your task list display.
                                        </li>
                                   </ul>
                                   <!-- Sorting and Filtering -->
                                   <!-- close button -->
                                   <div class="mt-4">
                                        <button
                                             type="button"
                                             class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                             @click="$emit('close')"
                                        >
                                             Got it, thanks!
                                        </button>
                                   </div>
                                   <!-- close button -->
                              </HeadlessUI.DialogPanel>
                         </HeadlessUI.TransitionChild>
                    </div>
               </div>
          </HeadlessUI.Dialog>
     </HeadlessUI.TransitionRoot>
</template>

<script setup>
import { HeadlessUI } from "../imports";
import ScreenOverlay from "./extra_components/ScreenOverlay.vue";
defineProps(["isOpen"]);
</script>
