export type TErrorMessages = {
    path: string,
    message: string
}[]
export type TGenericErrorResponse = {
    message: string
    statusCode: number
    errorMessages: TErrorMessages
}