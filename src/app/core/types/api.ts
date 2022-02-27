type BaseError = {
  method: string
  url: string
  statusText: string
  statusCode: number
}

export type Credentials = {
  email: string
  password: string
}

export type EmailConfirmParams = {
  token: string
  tokenId: string
}

export type AuthenticationError = BaseError & {
  error: string
  errorCode: string
}
