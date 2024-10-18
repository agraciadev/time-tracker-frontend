<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue'
import { useTimerStore } from '@/stores/timer'
import { useTaskStore } from '@/stores/task'
import { useErrorsStore } from '@/stores/errors'
import { taskService } from '@/services/task'
import { useTaskListStore } from '@/stores/taskList'
import { DateTime } from 'luxon';

useHead(() => ({
    title: "Time tracker",
    meta: [
        {
            name: 'Time tracker',
            content: 'Time tracker',
        },
    ],
}))

const loading = ref(false)
const init = ref(false)

const timer = useTimerStore()
const task = useTaskStore()
const errors = useErrorsStore()
const taskList = useTaskListStore()

onMounted(async () => {
    await taskList.update()
    if (taskList.tasks) {
        const taskInProgress = taskList.tasks.find(task => task.inProgress === true);
        if (taskInProgress) {
            task.task = taskInProgress.name
            task.inProgress = true

            const time = taskInProgress.times.find(time => time.endTime == undefined)
            const diff = DateTime.now().diff(time.startTime, ['hours', 'minutes', 'seconds']);
            timer.hours = diff.hours
            timer.minutes = diff.minutes
            timer.seconds = Math.trunc(diff.seconds)
            timer.startTimer()
        }
    }
    init.value = true
})

watch(() => task.task, () => {
    if (!task.inProgress) {
        timer.resetTimer()
    }
})

const formattedTime = computed(() => {
    const h = String(timer.hours).padStart(2, '0')
    const m = String(timer.minutes).padStart(2, '0')
    const s = String(timer.seconds).padStart(2, '0')
    return `${h}:${m}:${s}`
})

async function toggleTimer() {
    loading.value = true

    if (task.inProgress) {
        await taskService.end({ name: task.task })
        timer.stopTimer()
    } else {
        await taskService.start({ name: task.task })
        timer.startTimer()
    }

    task.inProgress = !task.inProgress
    loading.value = false
}



</script>

<template>
    <v-container v-if="!init">
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-responsive class="mx-auto" max-width="344">
                    <v-skeleton-loader type="text"></v-skeleton-loader>
                </v-responsive>
            </v-col>
            <v-col cols="2">
                <v-skeleton-loader type="button"></v-skeleton-loader>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto my-8" elevation="16" max-width="344">
                    <v-skeleton-loader type="text"></v-skeleton-loader>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
    <v-container v-if="init">
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-responsive class="mx-auto" max-width="344">
                    <v-text-field hide-details="auto" label="Task" v-model="task.task"
                        :readOnly="task.inProgress"></v-text-field>
                </v-responsive>
            </v-col>
            <v-col cols="auto">
                <v-btn :icon="!task.inProgress ? 'mdi-play' : 'mdi-stop'" size="x-large" color="white"
                    @click="toggleTimer" :disabled="!task.task || loading"></v-btn>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="mx-auto my-8" elevation="16" max-width="344">
                    <v-card-text class="text-center text-h2">
                        {{ formattedTime }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<style scoped></style>