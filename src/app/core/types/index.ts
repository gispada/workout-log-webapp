export type Message = {
  i18nText: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
  pauseOnHover?: boolean
  animate?: boolean
}
