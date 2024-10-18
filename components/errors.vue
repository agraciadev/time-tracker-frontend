<script lang="ts" setup>
import AppError from '@/models/appError';
import { useErrorsStore } from '@/stores/errors';

const errorsStore = useErrorsStore()
const snackbar = ref(true)

watch(snackbar, (newValue) => {
    if (!newValue) {
        close()
    }
})

const hasToOpen = () => {
    return errorToShow() ? true : false
}

const errorToShow = (): AppError | undefined => {
    return errorsStore.errors.find((e) => {
        return !e.showed
    })
}

const close = () => {
    const e = errorToShow()
    if (e) {
        e.showed = true
    }
    snackbar.value = true
}

</script>

<template>
    <v-snackbar v-if="hasToOpen()" v-model="snackbar">
        {{ errorToShow()?.message ? errorToShow()?.message : 'Unexpected error' }}

        <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped></style>