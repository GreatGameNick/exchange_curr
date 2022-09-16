<template lang="pug">
.exchange-body-wrapper(v-if="GET_UNIT_TYPE_LIST.length > 0")
  PickUpInput(
    v-for="(setVal, setKey, ind) of inputSets"
    :key="'input' + ind"
    :eiData="setVal.eiData"
    v-model="setVal.val"
    @selectedUnitType="retrieveUnitType"
    @whereFocusIs="retrieveFocus"
  )


</template>

<script>
import {mapGetters} from "vuex"
import {amountConvertor} from '~/features/currencyServices/amountConvertor'

export default {
  name: "ExchangeBody",
  computed: {
    ...mapGetters({
      GET_CURRENCY_COUPLE: 'GET_CURRENCY_COUPLE',
      GET_EXCHANGE_RATE: 'GET_EXCHANGE_RATE',
      GET_UNIT_TYPE_LIST: 'GET_UNIT_TYPE_LIST',
    })
  },
  data() {
    return {
      inputSets: {
        AS: {
          eiData: {
            inputCode: 'AS',
            title: 'You Pay',
            placeholder: 'Pay Amount',
            unitTypeList: [],
            checkedUnitType: ''
          },
          val: '',
          allowToOrder: true
        },
        DS: {
          eiData: {
            inputCode: 'DS',
            title: 'You Get',
            placeholder: 'Get Amount',
            unitTypeList: [],
            checkedUnitType: ''
          },
          val: '',
          allowToOrder: true
        },
      },
      whereFocusIs: '',
      isUpdateAmount: null,
      upgradeRate: 0
    }
  },
  methods: {
    retrieveUnitType({inputCode, unitType}) {
      this.inputSets[inputCode].eiData.checkedUnitType = unitType
      this.exchangeCalculator(inputCode)
    },
    retrieveFocus(inputCode) {
      this.whereFocusIs = inputCode
    },
    exchangeCalculator(inputCode) {                   //inputCode - откуда начинаем плясать и куда ретерним.
      if(!this.inputSets[inputCode].val)
        return

      let currencyCouple = this.GET_CURRENCY_COUPLE({
        base_currency: this.inputSets.AS.eiData.checkedUnitType,
        quote_currency: this.inputSets.DS.eiData.checkedUnitType
      })

      let rateSet = this.GET_EXCHANGE_RATE({
        base_currency: this.inputSets.AS.eiData.checkedUnitType,
        quote_currency: this.inputSets.DS.eiData.checkedUnitType
      })

      let result = amountConvertor({
        amount: this.inputSets[inputCode].val,
        rate: rateSet.rate,
        commission: currencyCouple.commission
      })

      if(inputCode === 'AS')
        this.inputSets.DS.val = result
      else
        this.inputSets.AS.val = result
    },
    updateAmount() {
      this.isUpdateAmount = setInterval(() => {
        this.exchangeCalculator(this.whereFocusIs || 'AS')
      }, 30000)
    }
  },
  watch: {
    'inputSets.AS.val':function () {
      if(this.whereFocusIs === 'AS')
        this.exchangeCalculator('AS')
    },
    'inputSets.DS.val':function () {
      if(this.whereFocusIs === 'DS')
        this.exchangeCalculator('DS')
    },
  },
  created() {
    let inputSetsKeys = Object.keys(this.inputSets)
    for (let key of inputSetsKeys) {
      this.inputSets[key].eiData.checkedUnitType = this.GET_UNIT_TYPE_LIST[0]
      this.inputSets[key].eiData.unitTypeList.push(...this.GET_UNIT_TYPE_LIST)
    }

    this.updateAmount()
  },
  beforeDestroy() {
    clearInterval(this.isUpdateAmount)
  }
}
</script>

<style scoped lang="scss">
.exchange-body-wrapper {

  & > * {
    margin-top: $commonGap;
  }
}
</style>
