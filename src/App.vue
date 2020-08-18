<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" class="blue-grey darken-1" dark app>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="blue-grey lighten-2" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline title">
        <v-icon class="mr-2" color="#FFFF00">mdi-virus</v-icon>COVID-19
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    items: [
      { title: 'World summary', icon: 'mdi-earth', link: '/' },
      {
        title: 'Ukraine statistics',
        icon: 'mdi-newspaper',
        link: '/country/Ukraine'
      },
      { title: 'Top 10 countries', icon: 'mdi-flag', link: '/top10countries' }
    ],
    drawer: true
  })
};
</script>

<style lang="scss" scoped>
.title {
  color: #ffff00;
}
</style>