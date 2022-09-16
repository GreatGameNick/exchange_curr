export default {
  state: () => ({
    modalData: {
      id: '',
      title: '',
      text: '',
    },
  }),
  getters: {
    GET_MODAL_DATA: state => state.modalData
  },
  mutations: {
    SET_MODAL_STUFF: (state, modalServiceExemplar) => {
      state.modalData = modalServiceExemplar?.modalData ||
        {
          id: '',
          title: '',
          text: ''
        }
    }
  },
  actions: {
  }
}

