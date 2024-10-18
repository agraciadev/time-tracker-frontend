import Task from "~/models/task/task";
import { AbstractService } from "./abstractService";
import type TaskJson from "~/models/task/task-json";

class TaskService extends AbstractService {

    async start(data: { name: string }): Promise<boolean> {
        const response = await this.post({
            endpoint: "/task/start", data: {
                name: data.name
            }
        })

        return response != null
    }

    async end(data: { name: string }): Promise<boolean> {
        const response = await this.post({
            endpoint: "/task/end", data: {
                name: data.name
            }
        })

        return response != null
    }

    async list(): Promise<Array<Task>> {
        const response = await this.get({
            endpoint: "/task/all"
        })

        if (response) {
            const result: Array<Task> =[];
            (response as Array<TaskJson>).forEach((element) => {
                result.push(Task.fromJSON(element))
            });

            return result
        }
        return []
    }
}
export const taskService = new TaskService()