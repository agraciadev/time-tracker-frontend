import { DateTime } from "luxon";

export default function dateTimeDiff(times: { startTime: DateTime, endTime: DateTime | undefined }[]): { days: number, hours: number, minutes: number, seconds: number } {
    let totalTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    let totalSeconds = 0

    times.forEach(date => {
        const endTime = date.endTime || DateTime.now()
        const diff = endTime.diff(date.startTime);
        totalSeconds += diff.as('seconds');
    })

    const days = Math.floor(totalSeconds / 86400);
    let remainingSeconds = totalSeconds % 86400;

    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds = remainingSeconds % 3600;

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    totalTime.days = days;
    totalTime.hours = hours;
    totalTime.minutes = minutes;
    totalTime.seconds = Math.trunc(seconds);

    return totalTime
}