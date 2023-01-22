<template>
  <div v-if="inputType === 'input'">
    <label
      v-if="label"
      :for="label"
      class="block text-sm font-medium text-gray-700"
      >{{ label }}</label
    >

    <div class="mt-1 relative rounded-md shadow-sm">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon :icon="icon" class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
  <div v-else>
    <div>
      <label
        v-if="label"
        :for="label"
        class="block text-sm font-medium text-gray-700"
        >{{ label }}</label
      >
      <div class="mt-1">
        <textarea
          rows="4"
          class="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
          v-bind="$attrs"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  inputType: {
    type: String,
    default: 'input',
  },

  label: {
    type: [String, Boolean],
    default: false,
  },

  modelValue: {
    type: String,
    default: '',
  },

  icon: {
    type: [String, Boolean],
    default: false,
  },
})
</script>
