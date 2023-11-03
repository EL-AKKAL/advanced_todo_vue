<template>
     <div class="min-h-screen bg-bgColor">
          <HeadlessUI.Disclosure
               as="nav"
               class="bg-white shadow border-b border-b-gray-200"
               v-slot="{ open }"
          >
               <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 items-center justify-between">
                         <div class="flex items-center">
                              <div class="flex-shrink-0">
                                   <img
                                        class="h-8 w-8"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                   />
                              </div>
                              <div class="hidden md:block">
                                   <div
                                        class="ml-10 flex items-baseline space-x-4"
                                   >
                                        <router-link
                                             v-for="item in navigation"
                                             :key="item.name"
                                             :to="item.to"
                                             active-class="font-semibold text-gray-900"
                                             class="text-gray-700 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'"
                                             >{{ item.name }}
                                        </router-link>
                                        <button
                                             @click="openHowItWorks"
                                             active-class="font-semibold text-gray-900"
                                             class="text-gray-700 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'"
                                        >
                                             How It Works
                                        </button>
                                   </div>
                              </div>
                         </div>
                         <div class="hidden md:block">
                              <div class="ml-4 flex items-center md:ml-6">
                                   <!-- Profile dropdown -->
                                   <HeadlessUI.Menu
                                        as="div"
                                        class="relative ml-3"
                                   >
                                        <div>
                                             <HeadlessUI.MenuButton
                                                  active-class="font-semibold text-gray-900"
                                                  class="text-gray-700 hover:text-gray-800 px-3 py-2 text-sm font-semibold"
                                             >
                                                  Account
                                             </HeadlessUI.MenuButton>
                                        </div>
                                        <transition
                                             enter-active-class="transition ease-out duration-100"
                                             enter-from-class="transform opacity-0 scale-95"
                                             enter-to-class="transform opacity-100 scale-100"
                                             leave-active-class="transition ease-in duration-75"
                                             leave-from-class="transform opacity-100 scale-100"
                                             leave-to-class="transform opacity-0 scale-95"
                                        >
                                             <HeadlessUI.MenuItems
                                                  class="cursor-pointer absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                             >
                                                  <HeadlessUI.MenuItem
                                                       v-slot="{ active }"
                                                  >
                                                       <a
                                                            @click="logout"
                                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                                            >Sign Out</a
                                                       >
                                                  </HeadlessUI.MenuItem>
                                             </HeadlessUI.MenuItems>
                                        </transition>
                                   </HeadlessUI.Menu>
                              </div>
                         </div>
                         <div class="-mr-2 flex md:hidden">
                              <!-- Mobile menu button -->
                              <HeadlessUI.DisclosureButton
                                   class="relative inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-100 hover:text-600 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-gray-300"
                              >
                                   <Bars3Icon
                                        v-if="!open"
                                        class="block h-6 w-6"
                                        aria-hidden="true"
                                   />
                                   <XMarkIcon
                                        v-else
                                        class="block h-6 w-6"
                                        aria-hidden="true"
                                   />
                              </HeadlessUI.DisclosureButton>
                         </div>
                    </div>
               </div>

               <HeadlessUI.DisclosurePanel class="md:hidden">
                    <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                         <router-link
                              v-for="item in navigation"
                              :key="item.name"
                              as="a"
                              :to="item.to"
                              active-class="text-gray-800"
                              class="text-gray-700 hover:bg-gray-200 hover:text-gray-800 block rounded-md px-3 py-2 text-base font-semibold cursor-pointer"
                         >
                              {{ item.name }}
                         </router-link>
                         <button
                              active-class="text-gray-800"
                              class="w-full text-left text-gray-700 hover:bg-gray-200 hover:text-gray-800 block rounded-md px-3 py-2 text-base font-semibold cursor-pointer"
                         >
                              How It Works
                         </button>
                    </div>
                    <div class="border-t-2 border-gray-200 py-2">
                         <div class="flex items-center px-5">
                              <div class="space-y-1 px-2 w-full">
                                   <HeadlessUI.DisclosureButton
                                        as="a"
                                        @click="logout"
                                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                                        >Sign Out</HeadlessUI.DisclosureButton
                                   >
                              </div>
                         </div>
                    </div>
               </HeadlessUI.DisclosurePanel>
          </HeadlessUI.Disclosure>
          <HowItWorks :isOpen="isHowItWorksOpen" @close="closeHowItWorks" />
          <router-view></router-view>
     </div>
</template>

<script setup>
import store from "../store";
import HowItWorks from "./HowItWorks.vue";
import { HeadlessUI, Bars3Icon, XMarkIcon, ref, useRouter } from "../imports";

//vars
const router = useRouter();
const navigation = [
     { name: "Dashboard", to: { name: "MyTasks" } },
     { name: "Create Task", to: { name: "TaskCreate" } },
];
const isHowItWorksOpen = ref(false);
// log out
const logout = () => {
     store.dispatch("logout").then(() => {
          router.push({ name: "Login" });
     });
};
// open how it works popup
function openHowItWorks() {
     isHowItWorksOpen.value = true;
}
// close how it works popup
function closeHowItWorks() {
     isHowItWorksOpen.value = false;
}
</script>
