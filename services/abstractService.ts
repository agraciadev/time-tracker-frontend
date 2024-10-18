import AppError from "@/models/appError"
import { useErrorsStore } from "@/stores/errors"

type RequestMethod = "POST" | "GET"

export abstract class AbstractService {

    protected async post(data: { endpoint: string, data: any }) {
        return this.makeCall({ endpoint: data.endpoint, method: "POST", data: data.data })
    }

    protected async get(data: { endpoint: string }) {
        return this.makeCall({ endpoint: data.endpoint, method: "GET" })
    }

    private async makeCall(data: { endpoint: string, method: RequestMethod, data?: any }): Promise<any | null> {
        const errorsStore = useErrorsStore()
        const config = useRuntimeConfig()

        try {
            const options: { method: RequestMethod, body?: any, headers?: any } = {
                method: data.method
            }

            if (data.data) {
                options.body = data.data
            }

            return await $fetch(config.public.api + data.endpoint, options)
        } catch (error: any) {
            console.log(error.data)
            errorsStore.addError(AppError.fromAPIError(error.data))
            console.log(errorsStore.errors)
        }

        return null
    }
}