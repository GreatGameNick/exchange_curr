<template>
  <div v-if="GET_MODAL_DATA.title || GET_MODAL_DATA.text"
       class="modal-wrapper"
  >
    <div @click="shutDownModal"
         class="modal__outside"
    >
    </div>

    <div class="modal__window">
      <div class="window__header">
        <h5 v-if="GET_MODAL_DATA.title" class="window__title">
          {{ GET_MODAL_DATA.title }}
        </h5>
        <div @click="shutDownModal" type="button" class="window__cross">
          &times;
        </div>
      </div>

      <div class="window__body">
        <div v-if="GET_MODAL_DATA.text" class="body__text">
          {{ GET_MODAL_DATA.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  computed: {
    ...mapGetters({
      GET_MODAL_DATA: 'modalStore/GET_MODAL_DATA'
    })
  },
  data: () => ({
    modelsSet: {}   // IModelsSet
  }),
  methods: {
    shutDownModal() {
      this.$store.commit('modalStore/SET_MODAL_STUFF', null)
    },
    getModelsSet(modelsSet) {  // IModelsSet
      console.log('ModalView.vue ====', modelsSet)
      this.modelsSet = modelsSet
    },
    runModalWindowInAnyComponent__Example() {
      let kolaModal = this.$modal({
        title: 'example',
        windowType: 'tooActions',
      })

      kolaModal.run()
          .then(responseSet => console.log('responseSet =====', responseSet))

    }
  }
}

</script>

<style scoped lang="scss">
.modal-wrapper {
  position: fixed;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  .modal__outside {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(248, 249, 250, 0.8);
    backdrop-filter: blur(2px);
  }

  .modal__window {
    z-index: 101;
    min-width: 200px;
    max-width: 80%;
    width: fit-content;
    min-height: 200px;
    //height: fit-content;
    background: white;
    background-clip: padding-box;
    border: 1px solid #e7f0f7;
    box-shadow: 0 0.5rem 2rem rgb(0 106 182 / 30%);
    padding: $commonGap;

    .window__header {
      display: flex;
      padding: 16px;
      border-bottom: #e7f0f7 1px solid;

      .window__cross {
        width: 20px;
        height: 100%;
        margin-left: auto;
        text-align: center;
        cursor: pointer;
      }

      .window__title {
        text-transform: uppercase;
      }
    }

    .window__body {
      margin-top: 10px;
    }

    .body__component {

    }
  }

  .modal-footer {
    margin-top: 20px;
  }

  h5 {
    margin: 0;
  }
}

</style>


