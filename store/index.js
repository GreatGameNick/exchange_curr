import axios from "axios";

export const state = () => ({
  currencyCouples: [],
  exchangeRates: []
})

export const getters = {
  GET_CURRENCY_COUPLE: state => ({base_currency, quote_currency}) => {
    const code = `${base_currency}/${quote_currency}`
    return state.currencyCouples.find(item => item.code === code)
  },
  GET_EXCHANGE_RATE: state => ({base_currency, quote_currency}) => {
    const code = `${base_currency}/${quote_currency}`
    return state.exchangeRates.find(item => item.code === code)
  },
  GET_UNIT_TYPE_LIST: state => {
    const rowTypeList = []
    for (let currencyCouple of state.currencyCouples) {
      rowTypeList.push(currencyCouple.base_currency)
    }
    return [...new Set(rowTypeList)]
  }
}

export const mutations = {
  SET_CURRENCY_COUPLES(state, currencyCouples) {
    state.currencyCouples.push(...currencyCouples)
  },
  SET_EXCHANGE_RATES(state, exchangeRates) {
    state.exchangeRates.push(...exchangeRates)
  },
}

export const actions = {
  async nuxtServerInit(vueContext, context) {
    await vueContext.dispatch('FETCH_CURRENCY_DATA', {vueContext, context})
  },
  async FETCH_CURRENCY_DATA(ctx, serverCtx) {
    let $axios = null
    let commit = null

    if (process.server) {
      $axios = serverCtx.context.app.$axios
      commit = serverCtx.vueContext.commit
    } else {
      $axios = axios
      commit = ctx.commit
    }

    await $axios.$get(`${process.env.DEV_BASE_URL}/api/currency-couples`)
      .then(data => commit('SET_CURRENCY_COUPLES', data.currencyCouples))

    await $axios.$get(`${process.env.DEV_BASE_URL}/api/exchange-rates`)
      .then(data => commit('SET_EXCHANGE_RATES', data.exchangeRates))
  }
}
