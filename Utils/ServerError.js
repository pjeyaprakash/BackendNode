export class ServerError extends Error{
    constructor(statusCode = 500, errMsg = "Server Error"){
        super(errMsg)
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}