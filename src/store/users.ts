import { defineStore } from "pinia"

type User = {
  name: string
  age: number
  email: string
  password: string
}

export default defineStore("users", {
  state: (): User => {
    return {
      name: "Daywison 2",
      age: 0,
      email: "",
      password: "",
    }
  },
  getters: {
    getCurrentUser(): string | null {
      if (this.name && this.email)
        return `this user (${this.name}) has ${this.email} email`
      return null
    },
  },
  actions: {
    setCredentials(email: string, password: string, name: string): void {
      this.email = email
      this.password = password
      this.name = name
    },
  },
})
