<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <KeepAlive>
        <Suspense>
          <component :is="Component"></component>
          <template #fallback> Loading... </template>
        </Suspense>
      </KeepAlive>
    </template>
  </RouterView>
</template>
