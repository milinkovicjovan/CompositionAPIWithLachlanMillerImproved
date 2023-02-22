<script setup>
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import UserForm from "./UserForm.vue";

const usersStore = useUsers();
const modal = useModal();

async function handleSignup(newUser) {
  await usersStore.createUser(newUser);
  modal.hideModal();
}
</script>

<template>
  <UserForm @submit="handleSignup" />
</template>
