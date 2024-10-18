const ERRORS = [
    //ROUTE
    {
        code: "ROUTE001",
        message: "Ruta no existe"
    },
    {
        code: "ROUTE002",
        message: "Método no permitido"
    },
    //TASK
    {
        code: "TASK001",
        message: "Task not exists"
    },
    {
        code: "TASK002",
        message: "Task in progress"
    },
    {
        code: "TASK003",
        message: "Task not in progress"
    },
    //TIME
    {
        code: "TIME001",
        message: "Time end not valid"
    }
]


export default class AppError {
    message: string;
    code: string;
    showed = false

    constructor(
        message: string,
        code: string,
    ) {
        this.message = message
        this.code = code
    }

    static fromAPIError(data: { status: number, code: string, description: string }) {
        const errorData = ERRORS.find((e) => e.code == data.code)

        return new AppError(
            errorData ? errorData.message : data.description,
            data.code,
        )
    }

    static fromString(data: { description: string, code?: string }) {
        return new AppError(
            data.description,
            data.code ? data.code : "0",
        )
    }
}
