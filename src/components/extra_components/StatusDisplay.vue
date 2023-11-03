<template>
     <span
          :class="[
               status
                    ? 'text-green-600 bg-green-100 border-green-200'
                    : 'text-yellow-700 bg-yellow-100  border-yellow-200',
          ]"
          class="ml-2 px-3 py-[2px] rounded-lg border-2 text-xs"
          >{{ status ? "Completed" : "In-progress" }}</span
     >
</template>

<script setup>
defineProps(["status"]);
</script>
