export function amountConvertor({amount, rate, commission}) {
  let rawAmount =  Number(amount) * Number(rate)
  return (rawAmount - rawAmount / 100 * commission).toString()
}
