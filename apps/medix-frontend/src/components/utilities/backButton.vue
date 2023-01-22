<template>
  <div
    class="flex gap-y-2 items-center text-gray-two cursor-pointer"
    @click="router.go(-1)"
  >
    <Icon icon="ion:ios-arrow-back" class="h-4 w-4" aria-hidden="true" />
    <div class="text-sm">Back</div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const router = useRouter()
</script>

<style></style>
