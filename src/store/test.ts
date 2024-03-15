import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
  const state = ref(0)

  const increment = () => {
    state.value++
  }

  return {
    state,
    increment
  }
})