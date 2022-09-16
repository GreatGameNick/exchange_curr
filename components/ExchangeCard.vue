<template lang="pug">
  .exchange-card-wrapper
    .exchange-card__title
      slot(name="title")
    .exchange-card__body
      slot(name="body")

</template>

<script>
export default {
  name: "ExCard"
}
</script>

<style scoped lang="scss">
.exchange-card-wrapper {
  min-width: rem(300);
  border-radius: 4px;
  background-color: $white;
  border: 1px solid #e1e4e8;
  box-sizing: border-box;
  padding: $commonGap;

  .exchange-card__title {
    border-bottom: 1px solid #e1e4e8;
    padding: $commonGap 0;
    text-transform: uppercase;
    font-weight: 900;
  }

  .exchange-card__body {

  }

}

</style>
