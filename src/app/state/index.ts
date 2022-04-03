import { routerReducer } from '@ngrx/router-store'
import { appReducer, AppEffects } from './app'
import { ExercisesEffects, exercisesReducer } from './exercises'
import { tagsReducer, TagsEffects } from './tags'
import { userReducer, UserEffects } from './user'

// TODO: move the store to its own module?

export const reducers = {
  router: routerReducer,
  app: appReducer,
  user: userReducer,
  exercises: exercisesReducer,
  tags: tagsReducer
}

export const effects = [AppEffects, UserEffects, ExercisesEffects, TagsEffects]

// Exclude NgRx router slice, its type is not inferred correctly with ReturnType
export type RootState = {
  [K in keyof Omit<typeof reducers, 'router'>]: ReturnType<typeof reducers[K]>
}
