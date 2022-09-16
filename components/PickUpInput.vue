<template lang="pug">
.pick-up-input-wrapper
  .pick-up__title {{ eiData.title }}
  .pick-up__body
    input(
      v-model="inputAmount"
      :placeholder="eiData.placeholder"
      @click="whereFocusIs"
    )

    .body__unit-btn(@click="isSelectShow = !isSelectShow")
      .btn-txt {{ selectedUnitType }}

    select(v-model="selectedUnitType")
      option(
        v-for="(unitType, ind) of eiData.unitTypeList"
        :key="'ut' + ind"
        :value="unitType"
        @click="isSelectShow = false"
      ) {{ unitType }}



</template>

<script>
export default {
  name: "PickUpInput",
  props: {
    eiData: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    inputAmount: {
      get() {
        return this.inputAmountBuffer
      },
      set(val) {
        let buffer = val
        let previsionInputAmountBuffer = this.inputAmountBuffer
        this.inputAmountBuffer = val

        let RE = /([^(\d|\.|,)]|\(|\))/g
        let RE2 = /(\.|,)/g

        this.inputAmountBuffer = buffer.replace(RE, '')
        let validation2 = buffer.split(RE2)

        if (validation2.length > 3)
          this.inputAmountBuffer = `${validation2[0]}.${validation2[2]}`
        if (validation2.length === 3 && previsionInputAmountBuffer === '')
          this.inputAmountBuffer = '0.'

        this.$emit('input', this.inputAmountBuffer)
      }
    },
    selectedUnitType: {
      get() {
        return this.selectedUnitTypeBuffer
      },
      set(val) {
        this.selectedUnitTypeBuffer = val
        this.$emit('selectedUnitType', {inputCode: this.eiData.inputCode, unitType: val})
      }
    }
  },
  data() {
    return {
      inputAmountBuffer: '',
      selectedUnitTypeBuffer: '',
      isSelectShow: false
    }
  },
  methods: {
    whereFocusIs() {
      this.$emit('whereFocusIs', this.eiData.inputCode)
    }
  },
  watch: {
    'value': {
      handler: function (newVal) {
        this.inputAmountBuffer = newVal
      }
    }
  },
  created() {
    this.selectedUnitTypeBuffer = this.eiData.checkedUnitType
  }

}
</script>

<style scoped lang="scss">
.pick-up-input-wrapper {
  height: fit-content;

  .pick-up__title {
    font-weight: 900;
    box-sizing: border-box;
    padding-bottom: calc($commonGap / 2);
  }

  .pick-up__body {
    position: relative;
    width: 100%;
    height: min-content;
    display: flex;

    input {
      display: block;
      border: $blue_light 1px solid;
      padding: rem(4);
      z-index: 10;
    }

    .body__unit-btn {
      width: 100%;
      display: flex;
      flex: 1;
      place-items: center center;
      background: $blue;
      z-index: 10;
      pointer-events: none;

      .btn-txt {
        margin: 0 auto;
        color: $white;

      }
    }

    select {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      z-index: 5;
      cursor: pointer;
      border: $grey_light 1px solid;

      option {
        background: $white;
      }
    }

  }

}
</style>
