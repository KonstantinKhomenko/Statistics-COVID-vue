<template>
  <div class="loader-wrap">
    <v-progress-circular :size="70" :width="7" color="#263238" indeterminate class="loader"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Loader'
};
</script>

<style lang="scss" scoped>
.loader-wrap {
  display: flex;
  height: 500px;

  .loader {
    margin: auto;
  }
}
</style>
