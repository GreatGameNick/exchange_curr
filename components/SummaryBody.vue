<template lang="pug">
.summary-body-wrapper
  .summary-body__btn(
    @click="getExchange"
  )
    | EXCHANGE

</template>

<script>
export default {
  name: "SummaryBody",
  methods: {
    getExchange() {
      let exchangeModal = this.$modal({
        title: 'exchange',
        text: 'congratulations !'
      })
      exchangeModal.run()
    }
  }
}
</script>

<style scoped lang="scss">
.summary-body-wrapper {

  .summary-body__btn {
    box-sizing: border-box;
    padding: calc($commonGap / 2);
    border: $grey_medium 1px solid;
    background: $grey_light;
    cursor: pointer;
  }

  .summary-body__btn:hover {
    opacity: 0.85;
  }
}
</style>
