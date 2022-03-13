import { createAction } from '@ngrx/store'
import { withActionData } from '../utils'
import { ModalDataById, ModalId } from './app.model'

export const loadingChanged = createAction(
  '[App] Loading status changed',
  withActionData<{ key: string; value: boolean }>()
)

export const modalOpened = createAction(
  '[App] Modal opened',
  withActionData<{ id: ModalId }>()
)

export const modalOpenedWithData = createAction(
  '[App] Modal opened with data',
  withActionData<{ id: ModalId; data: ModalDataById[ModalId] }>()
)

export const modalClosed = createAction('[App] Modal closed')
