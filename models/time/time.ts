import type TimeJson from "./time-json";
import { DateTime } from 'luxon';

export default class Time {
    startTime: DateTime;
    endTime: DateTime | undefined;

    constructor(
        startTime: DateTime,
        endTime: DateTime | undefined
    ) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    static fromJSON(json: TimeJson) {
        return new Time(
            DateTime.fromISO(json.start_time),
            json.end_time ? DateTime.fromISO(json.end_time) : undefined,
        )
    }
}
