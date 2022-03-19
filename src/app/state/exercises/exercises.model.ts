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
  id: string
  name: string
  description?: string
  tags?: string[]
  personalRecords?: PersonalRecord[]
  unitOfMeasure: UnitOfMeasure
  // hidden: boolean
}

export type ExercisesState = {
  exercises: Exercise[]
  draft?: Exercise
}
