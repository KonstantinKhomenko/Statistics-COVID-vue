<template>
  <div>
    <v-btn
      class="ma-3 blue lighten-1"
      elevation="10"
      small
      @click="$emit('visual-btn-clicked', 'cases')"
    >Total cases</v-btn>
    <v-btn
      class="ma-3 deep-orange darken-4"
      elevation="10"
      small
      @click="$emit('visual-btn-clicked', 'deaths')"
    >Deaths</v-btn>
    <v-btn
      class="ma-3 green lighten-2"
      elevation="10"
      small
      @click="$emit('visual-btn-clicked', 'recovered')"
    >Recoveries</v-btn>
  </div>
</template>

<script>
export default {
  name: 'VisualBtns'
};
</script>
