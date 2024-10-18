<script lang="ts" setup>
import { taskService } from '@/services/task'
import { useTaskListStore } from '@/stores/taskList'
import { DateTime } from "luxon";
import dateTimeDiff from "@/utils/dateTimeDiff"

const layout = 'default'

useHead(() => ({
    title: "Time tracker",
    meta: [
        {
            name: 'Time tracker',
            content: 'Time tracker',
        },
    ],
}))

const init = ref(false)

const taskList = useTaskListStore()

const tasks: Ref<Array<Task>> = ref([])

onMounted(async () => {
    await taskList.update()
    init.value = true
})

const formattedTime = computed(() => {
    let h = 0
    let m = 0
    let s = 0

    if (taskList.tasks) {
        const today = DateTime.now().startOf('day');

        const tasksToday = taskList.tasks.filter(task => {
            if (task.times.find(time => time.startTime.hasSame(today, 'day'))) {
                return true
            }
        });

        const dates = []

        tasksToday.forEach(task => {
            task.times.forEach(time => {
                dates.push(time)
            })
        });

        const totalTime = dateTimeDiff(dates)

        h += totalTime.hours;
        m += totalTime.minutes;
        s += Math.trunc(totalTime.seconds);
    }

    return `${h} Hours ${m} Minutes ${s} Seconds`
})

</script>

<template>
     <v-container v-if="!init">
        <v-card class="mx-auto my-4" elevation="16" max-width="344">
            <v-card-item>
                <v-card-title>
                    <v-skeleton-loader type="text"></v-skeleton-loader>
                </v-card-title>
            </v-card-item>

            <v-card-text>
                <v-skeleton-loader type="text"></v-skeleton-loader>
            </v-card-text>
        </v-card>
        <v-skeleton-loader type="table"></v-skeleton-loader>
    </v-container>
    <v-container v-if="init">
        <v-card class="mx-auto my-4" elevation="16" max-width="344">
            <v-card-item>
                <v-card-title>
                    Today you have worked
                </v-card-title>
            </v-card-item>

            <v-card-text>
                {{ formattedTime }}
            </v-card-text>
        </v-card>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Task
                    </th>
                    <th class="text-left">
                        Time
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in taskList.tasks" :key="task.name">
                    <td>{{ task.name }}</td>
                    <td class="time">
                        <span v-if="task.totalTime().years">{{ task.totalTime().years }} Years</span>
                        <span v-if="task.totalTime().months">{{ task.totalTime().months }} Months</span>
                        <span v-if="task.totalTime().days">{{ task.totalTime().days }} Days</span>
                        <span v-if="task.totalTime().hours">{{ task.totalTime().hours }} Hours</span>
                        <span v-if="task.totalTime().minutes">{{ task.totalTime().minutes }} Minutes</span>
                        <span v-if="task.totalTime().seconds">{{ task.totalTime().seconds }} Seconds</span>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>

</template>

<style scoped>
.time span {
    margin-left: 5px;
    display: inline-block;
}
</style>