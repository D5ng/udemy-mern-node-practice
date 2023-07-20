interface ErrorProps {
  code: number
  message: string
}

export default class CodeError extends Error {
  code: number
  message: string
  constructor({ code, message }: ErrorProps) {
    super(message)
    this.code = code
    this.message = message
  }
}
