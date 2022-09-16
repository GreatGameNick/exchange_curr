export class CurrencyUtils{
  static pickUpRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from) + from)
  }
}
