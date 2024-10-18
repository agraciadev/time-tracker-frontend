import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const intervalId = ref(null)

    function startTimer() {
        if (intervalId.value) {
            return
        }
        intervalId.value = setInterval(() => {
            seconds.value++
            if (seconds.value >= 60) {
                seconds.value = 0
                minutes.value++
            }
            if (minutes.value >= 60) {
                minutes.value = 0
                hours.value++
            }
        }, 1000)
    }
    
    function stopTimer() {
        clearInterval(intervalId.value)
        intervalId.value = null
    }
    
    function resetTimer() {
        console.log("resetTimer")
        stop()
        hours.value = 0
        minutes.value = 0
        seconds.value = 0
    }

    return { startTimer, stopTimer, resetTimer, hours, minutes, seconds }
})