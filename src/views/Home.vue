<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Timeline from "../components/Timeline.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <Timeline />
    </template>

    <template #fallback>
      <progress class="progress is-primary is-small" />
    </template>
  </Suspense>
</template>
