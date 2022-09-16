export class ModalService {
  modalData = {
    id: '',
    title: '',
    text: ''
  }
  store
  unwatch

  constructor({
                modalCode,
                title = '',
                text = '',
              },
              store
  ) {
    this.modalData = {
      id: Date.now().toString(),
      title,
      text,
    }
    this.store = store
  }

  run(){
    this.store.commit('modalStore/SET_MODAL_STUFF', this)
    setTimeout(() => this.close(), 10000)
  }

  close() {
    this.store.commit('modalStore/SET_MODAL_STUFF', null)
    if (this.unwatch)
      this.unwatch()
  }
}
