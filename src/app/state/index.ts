import { routerReducer } from '@ngrx/router-store'
import { userReducer, UserEffects } from './user'

// TODO: move the store to its own module?

export const reducers = {
  router: routerReducer,
  user: userReducer
}

export const effects = [UserEffects]
