<template>
  <h1>Hello Pinia</h1>
  <img
    src="https://d33wubrfki0l68.cloudfront.net/ddd72aa8248a5c2f77429b9496e6e3e4da2a4e26/8afc0/logo.svg"
  />
  <div class="container-inputs">
    <input placeholder="name" v-model="state.name" />
    <input placeholder="email" v-model="state.email" type="email" />
    <input placeholder="password" v-model="state.password" type="password" />
    <button @click="onSubmit">Salvar</button>
  </div>

  <h2 v-if="userStore.name && userStore.email">
    this user ({{ userStore.name }}) has {{ userStore.email }} email
  </h2>
  <h2 v-else>No Current User</h2>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { useUserStore } from "./store"

type State = {
  email: string | null
  name: string | null
  password: string | null
}

export default defineComponent({
  name: "App",
  setup() {
    const userStore = useUserStore()

    const state = reactive({
      email: null,
      name: null,
      password: null,
    } as State)

    const onSubmit = () => {
      if (state.email && state.name && state.password)
        userStore.setCredentials(state.email, state.password, state.name)
    }

    return {
      state,
      userStore,
      onSubmit,
    }
  },
})
</script>

<style scoped>
h1,
h2 {
  font-family: sans-serif;
  text-align: center;
  margin-top: 20px;
}

img {
  display: block;
  width: 100px;
  margin: 20px auto;
}

input {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid green;
  outline: none;
  margin-top: 20px;
  padding: 8px;
  box-sizing: border-box;
}

button {
  margin-top: 20px;
  width: 80%;
  border-radius: 8px;
  height: 30px;
  background: green;
  color: white;
}

.container-inputs {
  margin: 0 auto;
  width: 200px;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
