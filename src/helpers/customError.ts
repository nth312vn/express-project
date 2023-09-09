export class CustomError {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.message = message
    this.status = status
  }
}
