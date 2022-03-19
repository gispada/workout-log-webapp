import { createSelector, createFeatureSelector } from '@ngrx/store'
import { prop } from '@shared/utils/miscellaneous'
import { AppState, ModalDataById, ModalId } from './app.model'

const selectAppState = createFeatureSelector<AppState>('app')

const selectLoading = createSelector(selectAppState, prop('loading'))

export const selectLoadingStatus = (key: string) =>
  createSelector(selectLoading, prop(key))

export const selectIsModalVisible = (modalId: ModalId) =>
  createSelector(selectAppState, ({ modal }) => modal.visible && modal.id === modalId)

export const selectModalData = <T extends ModalId>(modalId: T) =>
  createSelector(selectAppState, ({ modal }) =>
    modal.visible && modal.id === modalId ? (modal.data as ModalDataById[T]) : null
  )
