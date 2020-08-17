<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" class="primary" dark app>
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

    <v-app-bar color="primary" dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="headline">
        <v-icon class="mr-2">mdi-virus</v-icon>COVID-19
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <Menu />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    Menu
  },
  data: () => ({
    items: [
      { title: 'World summary', icon: 'mdi-earth', link: '/' },
      { title: 'Countries', icon: 'mdi-flag', link: '/countries' },
      { title: 'News', icon: 'mdi-newspaper', link: '/' }
    ],
    drawer: false
  })
};
</script>
