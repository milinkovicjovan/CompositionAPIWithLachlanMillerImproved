<script setup>
const props = defineProps({
  name: String,
  modelValue: String,
  status: Boolean,
  type: String,
});

const emit = defineEmits(["update:modelValue"]);

function handleInput(e) {
  const value = e.target.value;
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        :id="name"
        :type="type"
        class="input"
        :value="modelValue"
        @input="handleInput"
      />
    </div>

    <p v-if="!status.valid" class="is-danger help">
      {{ status.message }}
    </p>
  </div>
</template>
