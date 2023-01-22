<template>
  <div v-if="type === 'primary'" class="rounded-md shadow">
    <button
      v-bind="$attrs"
      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10"
    >
      <slot />
      <!-- primary -->
    </button>
  </div>
  <div v-else-if="type === 'white'" class="rounded-md shadow">
    <button
      href="#"
      v-bind="$attrs"
      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-3 md:text-lg md:px-10"
    >
      <slot />
      <!-- white button -->
    </button>
  </div>
  <div v-else-if="type === 'accent'" class="rounded-md shadow">
    <button
      href="#"
      v-bind="$attrs"
      class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
    >
      <slot />
      <!-- accent button -->
    </button>
  </div>
  <!-- circular button -->
  <button
    v-else-if="type === 'rounded'"
    type="button"
    v-bind="$attrs"
    class="inline-flex items-center justify-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <Icon
      :icon="icon"
      :class="iconClass"
      class="h-4 w-4 absolute"
      aria-hidden="true"
    />
  </button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  icon: {
    type: String,
    default: 'ph:plus-fill',
  },
  iconClass: {},
})
</script>
