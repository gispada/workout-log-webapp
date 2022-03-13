import { createReducer, on } from '@ngrx/store'
import { TagsState } from './tags.model'

const tagsMock = [
  {
    id: '1',
    name: { i18nValue: 'Tags.Names.Pectorals' },
    category: 'c1'
  },
  {
    id: '2',
    name: { i18nValue: 'Tags.Names.Deltoids' },
    category: 'c1'
  },
  {
    id: '3',
    name: { i18nValue: 'Tags.Names.Quadriceps' },
    category: 'c1'
  },
  {
    id: '4',
    name: { i18nValue: 'Tags.Names.Triceps' },
    category: 'c1'
  },
  {
    id: '5',
    name: { i18nValue: 'Tags.Names.Forearms' },
    category: 'c1'
  },
  {
    id: '6',
    name: { i18nValue: 'Tags.Names.Hamstrings' },
    category: 'c1'
  },
  {
    id: '7',
    name: { i18nValue: 'Tags.Names.Abs' },
    category: 'c1'
  },
  {
    id: '8',
    name: { i18nValue: 'Tags.Names.Back' },
    category: 'c1'
  },
  {
    id: '9',
    name: { i18nValue: 'Tags.Names.Trapezius' },
    category: 'c1'
  },
  {
    id: '10',
    name: { i18nValue: 'Tags.Names.Calves' },
    category: 'c1'
  },
  {
    id: '1000',
    name: { value: 'Collo' },
    category: 'c1'
  },
  {
    id: '11',
    name: { i18nValue: 'Tags.Names.Beginner' },
    category: 'c2'
  },
  {
    id: '12',
    name: { i18nValue: 'Tags.Names.Intermediate' },
    category: 'c2'
  },
  {
    id: '13',
    name: { i18nValue: 'Tags.Names.Advanced' },
    category: 'c2'
  },
  {
    id: '14',
    name: { i18nValue: 'Tags.Names.Compound' },
    category: 'c3'
  },
  {
    id: '15',
    name: { i18nValue: 'Tags.Names.Isolation' },
    category: 'c3'
  }
]

const categoriesMock = [
  { id: 'c1', name: { i18nValue: 'Tags.Categories.MuscleGroup' } },
  { id: 'c2', name: { i18nValue: 'Tags.Categories.Difficulty' } },
  { id: 'c3', name: { i18nValue: 'Tags.Categories.MovementType' } }
]

const initialState: Readonly<TagsState> = {
  tags: tagsMock,
  categories: categoriesMock
}

export const tagsReducer = createReducer(initialState)
