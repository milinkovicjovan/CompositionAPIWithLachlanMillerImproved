<script setup>
const props = defineProps({
  post: Object,
});
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>
