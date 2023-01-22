<template>
  <div>
    <div class="grid grid-cols-6">
      <back-button class="col-start-1" />
      <m-steps :steps="steps" class="col-start-3 col-span-2" />
    </div>
    <div class="mt-6">
      <h2 class="text-gray-500 text-[16px] tracking-wide">Add Patient</h2>
      <h2 class="text-gray-500 text-[13px] tracking-wide mt-3">
        Other Information
      </h2>

      <div
        role="list"
        class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      ></div>
    </div>
  </div>
</template>

<script setup>
const steps = ref([
  { name: 'Step 1', href: '#', status: 'current' },
  { name: 'Step 2', href: '#', status: 'incomplete' },
])
</script>

<style></style>
