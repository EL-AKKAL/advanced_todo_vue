// this file serves for general imports and aplication dependencies
// it's grouped by import type for more code readability

// built-in dependencies
import { useRouter, useRoute } from "vue-router";
import { ref, computed, watch } from "vue";
// Third party libraries and components
import { useToast } from "vue-toastification";
import * as HeadlessUI from "@headlessui/vue";
import moment from "moment";
// Icons
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
// creating instances
const toast = useToast();
// exporting everything
export {
     useRouter,
     useRoute,
     ref,
     computed,
     watch,
     toast,
     moment,
     HeadlessUI,
     ChevronUpDownIcon,
     Bars3Icon,
     XMarkIcon,
};
