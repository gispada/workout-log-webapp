export type Credentials = {
  email: string
  password: string
}

export type EmailConfirmParams = {
  token: string
  tokenId: string
}

export type Message = {
  i18nText: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
  pauseOnHover?: boolean
  animate?: boolean
}
