import { Dictionary } from '@shared/types'

type Modal =
  | { visible: false }
  | { visible: true; id: ModalId; data?: ModalDataById[ModalId] }

// Common generic state
export type AppState = {
  loading: Dictionary<boolean>
  modal: Modal
}

export type ModalId = 'AddTags' | 'TestModal' | 'NeverModal'

export type ModalDataById = {
  AddTags: { tagsToExclude?: string[] }
  TestModal: { testModalData: string }
  NeverModal: never
}
