import Time from "../time/time";
import type TaskJson from "./task-json";
import dateTimeDiff from "@/utils/dateTimeDiff"

export default class Task {
    name: string;
    times: Array<Time>
    inProgress: boolean

    private _totalTime: { hours: number, minutes: number, seconds: number } | null = null

    constructor(
        name: string,
        times: Array<Time>,
        inProgress: boolean
    ) {
        this.name = name;
        this.times = times;
        this.inProgress = inProgress;
    }

    static fromJSON(json: TaskJson) {
        const times: Array<Time> = [];
        json.times.forEach((element) => {
            times.push(Time.fromJSON(element))
        });

        return new Task(
            json.name,
            times,
            json.in_progress
        )
    }

    public totalTime(): { hours: number, minutes: number, seconds: number } {
        if (this._totalTime == null) {
            this._totalTime = dateTimeDiff(this.times)
        }

        return this._totalTime
    }
}
