// Common generic state
export type AppState = {
  loading: {
    [K in LoadingKey]?: boolean
  }
}

export type LoadingKey =
  | 'auth'
  | 'exercises.fetch'
  | 'exercises.save'
  | 'exercises.delete'
