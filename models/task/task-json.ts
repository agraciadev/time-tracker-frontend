import type TimeJson from "../time/time-json";

export default interface TaskJson {
    name: string;
    times: Array<TimeJson>
    in_progress: boolean
}
