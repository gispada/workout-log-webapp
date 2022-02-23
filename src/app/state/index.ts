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
