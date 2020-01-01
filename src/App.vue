<template>
  <v-app id="sandbox">
    <v-navigation-drawer v-model="primaryDrawer.model" :clipped="primaryDrawer.clipped" app overflow />

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model" />
      <v-toolbar-title>Add Text</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
<div>
    To install Vuetify, type <kbd>npm install vuetify</kbd> into your console. Once complete, type <kbd>cd <code>&lt;project name&gt;</code></kbd> and run <kbd>npm install</kbd>
  </div>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  //import HelloWorld from './components/HelloWorld';

  export default {
    name: 'App',

    components: {},

    data: () => ({
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
        floating: false,
        mini: false,
      },
      footer: {
        inset: true,
      }
    }),
  };
</script>