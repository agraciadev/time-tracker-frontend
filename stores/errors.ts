import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import AppError from '@/models/appError'

export const useErrorsStore = defineStore('errors', () => {
    const errors: Ref<Array<AppError>> = ref([])

    function addError(error: AppError) {
        errors.value.push(error)
    }

    return { errors, addError }
})