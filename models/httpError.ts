export default class HttpError extends Error {
  constructor(public message: string, public errorCode?: number) {
    super(message)
    this.errorCode = errorCode
  }
}
