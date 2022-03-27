import { Nullable } from '@shared/types'
import { NewEntity, UserEditableProp } from '../types'

export type PersonalRecord = {
  id: string
  date: string
  value: number
}

export enum UnitOfMeasure {
  KG = 'weight:kg',
  LBS = 'weight:lbs',
  SS = 'time:ss',
  MM = 'time:mm',
  HH = 'time:hh'
}

export type Exercise = {
  _id: string
  name: UserEditableProp
  description?: UserEditableProp
  tags?: string[]
  personalRecords?: PersonalRecord[]
  unitOfMeasure: UnitOfMeasure
  ownerId: string
  // hidden: boolean
}

export type ExercisesState = {
  exercises: Nullable<Exercise[]>
  selected: string[]
  draft?: (Exercise | NewEntity<Exercise>) & { staticTitle: UserEditableProp }
}
