import { routerReducer } from '@ngrx/router-store'
import { appReducer, AppEffects } from './app'
import { userReducer, UserEffects } from './user'

// TODO: move the store to its own module?

export const reducers = {
  router: routerReducer,
  app: appReducer,
  user: userReducer
}

export const effects = [AppEffects, UserEffects]

// Exclude NgRx router slice, its type is not inferred correctly with ReturnType
export type RootState = {
  [K in keyof Omit<typeof reducers, 'router'>]: ReturnType<typeof reducers[K]>
}
