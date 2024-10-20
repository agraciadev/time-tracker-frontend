import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
    const task: Ref<string | null>  = ref(null)
    const inProgress = ref(false)


    return { task, inProgress }
})