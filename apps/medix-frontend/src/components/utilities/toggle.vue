<template>
  <div class="flex items-start">
    <div class="flex-shrink-0">
      <Switch
        v-model="agreed"
        :class="[
          agreed ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        ]"
      >
        <span class="sr-only">Agree to policies</span>
        <span
          aria-hidden="true"
          :class="[
            agreed ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
          ]"
        />
      </Switch>
    </div>
    <div class="ml-3">
      <p class="text-base text-gray-500">With is switch you can agree to our</p>
    </div>
  </div>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      v-model="agreed"
      :class="[
        agreed ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          agreed ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      />
    </Switch>
    <SwitchLabel as="span" class="ml-3">
      <span class="text-sm font-medium text-gray-900">Annual billing </span>
      <span class="text-sm text-gray-500">(Save 10%)</span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup>
const agreed = ref(false)
</script>

<style></style>
