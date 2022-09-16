<template lang="pug">
  .exchange-wrapper
    ExchangeCard.exchange__item(
      v-for="(set, ind) of templateCards"
      :key="'ec' + ind"
    )
          template(#title) {{set.title}}
          template(#body)
            div(:is="set.el")


</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'IndexPage',
  data: () => ({
    templateCards: [
      {
        title: 'Exchange',
        el: 'ExchangeBody'
      },
      {
        title: 'Summary',
        el: 'SummaryBody'
      },
    ]
  })
}
</script>


<style scoped lang="scss">
.exchange-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: $commonGap 0;

  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;

  .exchange__item {
    width: 44%;
    margin-bottom: $commonGap;
  }

}
</style>
