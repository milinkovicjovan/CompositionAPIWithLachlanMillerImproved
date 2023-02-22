<script setup>
import { computed, ref, useSlots } from "vue";
import FormInput from "./FormInput.vue";
import { validate, length, required } from "../validation";
import { useUsers } from "../stores/users";
import { useModal } from "../composables/modal";

const emit = defineEmits(["submit"]);

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const usersStore = useUsers();
const modal = useModal();

async function handleSubmit() {
  if (isInvalid.value) {
    return;
  }

  const newUser = {
    username: username.value,
    password: password.value,
  };

  try {
    emit("submit", newUser);
  } catch (e) {}
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput
      v-model="username"
      name="Username"
      :status="usernameStatus"
      type="text"
    />
    <FormInput
      v-model="password"
      name="Password"
      :status="passwordStatus"
      type="password"
    />
    <div v-if="error" class="is-danger help">
      {{ error }}
    </div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
