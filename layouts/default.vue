<template functional lang="pug">
  .exchange-wrapper
    header Exchange

    Nuxt

    ModalView

</template>

<script>

export default {
}
</script>

<style lang="scss">
.exchange-wrapper {
  position: relative;
  width: 100%;
  max-width: rem(900);
  margin: 0 auto;

  header {
    border-bottom: $grey 1px solid;
    box-sizing: border-box;
    padding: rem(20) 0;

    color: $green;
    font-weight: 900;
    text-transform: uppercase;
  }

}
</style>
