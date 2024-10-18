import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
    const task = ref(null)
    const inProgress = ref(false)


    return { task, inProgress }
})