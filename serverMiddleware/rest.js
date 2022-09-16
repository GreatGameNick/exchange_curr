const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios')
const serverService = require('./serverService')

app.use(bodyParser.json())

app.get('/currency-couples', async (req, res) => {
  const rawStaticData = await Promise.allSettled([
    axios.get(`${process.env.DEV_BASE_URL}/mockData/currencyList.json`, {headers: {'content-type': 'application/json;charset=UTF-8'}}),
    axios.get(`${process.env.DEV_BASE_URL}/mockData/commissionList.json`, {headers: {'content-type': 'application/json;charset=UTF-8'}})
  ])

  const currencyCouples = serverService.generateCurrencyCouples(rawStaticData)
  res.json({currencyCouples})
})


app.get('/exchange-rates', (req, res) => {
  const exchangeRates = []

  if(serverService.currencyCouples.length > 0)
    exchangeRates.push(...serverService.generateExchangeRates(serverService.currencyCouples))

  res.json({exchangeRates})
})

module.exports = app
