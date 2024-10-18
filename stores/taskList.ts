import { defineStore } from 'pinia'
import type Task from '~/models/task/task'
import { taskService } from '~/services/task'

export const useTaskListStore = defineStore('taskList', () => {
    const tasks: Ref<Array<Task>> = ref([])
    
    async function update(){
        tasks.value = await taskService.list()
    }


    return { tasks, update }
})