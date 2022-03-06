import { createReducer, on } from '@ngrx/store'
import { TagsState } from './tags.model'

const initialState: Readonly<TagsState> = {
  tags: [
    {
      id: '1',
      name: 'Pectorals',
      category: 'Muscle'
    },
    {
      id: '2',
      name: 'Biceps',
      category: 'Muscle'
    },
    {
      id: '3',
      name: 'Quadriceps',
      category: 'Muscle'
    },
    {
      id: '4',
      name: 'Compound',
      category: 'Type'
    },
    {
      id: '5',
      name: 'Isolation',
      category: 'Type'
    },
    {
      id: '6',
      name: 'Triceps',
      category: 'Muscle'
    }
  ]
}

export const tagsReducer = createReducer(initialState)
