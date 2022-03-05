import { Tag } from '@state/tags'

export type PersonalRecord = {
  id: string
  date: string
  value: number
  unit: string // TODO: use an enum?
}

export type Exercise = {
  id: string
  name: string
  description?: string
  tags?: Tag[]
  personalRecords?: PersonalRecord[]
  // hidden: boolean
}

export type ExercisesState = {
  exercises: Exercise[]
  draft?: Exercise
}
