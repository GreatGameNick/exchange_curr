const {CurrencyUtils} = require('./serverUtils')

module.exports = {
  currencyCouples: [],
  generateCurrencyCouples: function (rawStaticData) {
    if (rawStaticData[0].status === 'fulfilled' && rawStaticData[1].status === 'fulfilled') {
      const staticData = {}            // {currencyList, commissionList}
      for (let dataSet of rawStaticData) {
        staticData[dataSet.value.data.code] = dataSet.value.data.data
      }

      if (staticData.currencyList && staticData.commissionList) {
        for (let base_currency of staticData.currencyList) {
          staticData.currencyList.forEach(quote_currency => {
            this.currencyCouples.push(new CurrencyCouple(base_currency, quote_currency, staticData.commissionList))
          })
        }
        return this.currencyCouples
      }
      return []

    }
    return []
  },
  generateExchangeRates: function (currencyCouples) {
    if(this.currencyCouples.length === 0)
      return []

    const blackListOfCurrencyCouples = []
    const exchangeRates = []

    for(let currencyCouple of currencyCouples) {
      let checkingCode = `${currencyCouple.base_currency}/${currencyCouple.quote_currency}`

      if(!blackListOfCurrencyCouples.includes(checkingCode)) {
        let randomRate = CurrencyUtils.pickUpRandomNumber(+process.env.MIN_EXCHANGE_RANGE, +process.env.MAX_EXCHANGE_RANGE)
        exchangeRates.push(new ExchangeRate(currencyCouple.base_currency, currencyCouple.quote_currency, randomRate))
        exchangeRates.push(new ExchangeRate(currencyCouple.quote_currency, currencyCouple.base_currency, randomRate))
        blackListOfCurrencyCouples.push(`${currencyCouple.quote_currency}/${currencyCouple.base_currency}`)
      }
    }
    return exchangeRates
  }
}


class CurrencyCouple extends CurrencyUtils{
  code
  base_currency
  quote_currency
  commission

  constructor(base_currency, quote_currency, commissionList) {
    super()
    this.code = `${base_currency}/${quote_currency}`
    this.base_currency = base_currency
    this.quote_currency = quote_currency

    const randomNumber = CurrencyCouple.pickUpRandomNumber(0, commissionList.length)
    this.commission = commissionList[randomNumber]
  }
}

class ExchangeRate {
  code
  pair
  rate

  constructor(base_currency, quote_currency, rate) {
    this.code = `${base_currency}/${quote_currency}`
    this.pair = this.code
    this.rate = rate
  }
}
