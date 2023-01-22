<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav aria-label="Progress">
    <ol role="list" class="flex items-center">
      <li
        v-for="(step, stepIdx) in steps"
        :key="step.name"
        :class="[
          stepIdx !== steps.length - 1 ? 'pr-16 sm:pr-32' : '',
          'relative',
        ]"
      >
        <template v-if="step.status === 'complete'">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-indigo-600" />
          </div>
          <a
            class="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900"
          >
            <Icon
              icon="tabler:check"
              class="w-5 h-5 text-white"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
        <template v-else-if="step.status === 'current'">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            class="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
            aria-current="step"
          >
            <span
              class="h-2.5 w-2.5 bg-indigo-600 rounded-full"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
        <template v-else>
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="h-0.5 w-full bg-gray-200" />
          </div>
          <a
            href="#"
            class="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
          >
            <span
              class="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
              aria-hidden="true"
            />
            <span class="sr-only">{{ step.name }}</span>
          </a>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { Icon } from '@iconify/vue'
defineProps({
  steps: {
    type: Array,
    required: true,
  },
})
</script>
