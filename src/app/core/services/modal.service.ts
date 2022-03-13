import { Injectable } from '@angular/core'
import { appActions, appSelectors, ModalDataById, ModalId } from '@state/app'
import { Store } from '@ngrx/store'

const { modalClosed, modalOpened, modalOpenedWithData } = appActions
const { selectIsModalVisible, selectModalData } = appSelectors

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private store: Store) {}

  close() {
    this.store.dispatch(modalClosed())
  }

  open<T extends ModalId>(id: T, data?: ModalDataById[T]) {
    this.store.dispatch(data ? modalOpenedWithData({ id, data }) : modalOpened({ id }))
  }

  isVisible(id: ModalId) {
    return this.store.select(selectIsModalVisible(id))
  }

  getData<T extends ModalId>(id: T) {
    return this.store.select(selectModalData(id))
  }
}
