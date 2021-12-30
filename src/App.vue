<template>
  <h1>Hello Pinia</h1>
  <img
    src="https://d33wubrfki0l68.cloudfront.net/ddd72aa8248a5c2f77429b9496e6e3e4da2a4e26/8afc0/logo.svg"
  />

  <div>
    <form>
      <label>
        Form
        <input
          type="radio"
          name="form"
          value="form"
          v-model="state.component"
        />
      </label>
      <label>
        Fetch
        <input
          type="radio"
          name="form"
          value="fetch"
          v-model="state.component"
        />
      </label>
    </form>
  </div>

  <div class="container-inputs" v-if="state.component == 'form'">
    <input placeholder="name" v-model="state.name" class="form" />
    <input
      placeholder="email"
      v-model="state.email"
      type="email"
      class="form"
    />
    <input
      placeholder="password"
      v-model="state.password"
      type="password"
      class="form"
    />
    <button @click="onSubmit">Salvar</button>
  </div>
  <div v-else>
    <h1>Simple Fetch Data</h1>

    <div class="flex-container">
      <img
        :src="image.url"
        alt="#"
        v-for="(image, i) in state.images"
        :key="i"
      />
    </div>
  </div>

  <h2 v-if="userStore.name && userStore.email && state.component == 'form'">
    this user ({{ userStore.name }}) has {{ userStore.email }} email
  </h2>
  <h2 v-else-if="state.component == 'form'">No Current User</h2>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue"
import { useUserStore } from "./store"

type images = {
  albumId: number
  id: number
  url: string
  thumbnailUrl: string
}

type State = {
  component: "form" | "fetch"
  email: string | null
  name: string | null
  password: string | null
  images: images[]
}

export default defineComponent({
  name: "App",
  setup() {
    const userStore = useUserStore()

    const state = reactive({
      email: null,
      name: null,
      password: null,
      component: "form",
      images: {},
    } as State)

    onMounted(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums/1/photos"
      )
      const images: images[] = await response.json()
      state.images = images
      console.log(images)
    })

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

form {
  display: block;
  width: 200px;
  text-align: center;
  margin: 0 auto;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-container > img {
  display: block;
  width: 100px;
  height: 100px;
}
input.form {
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
