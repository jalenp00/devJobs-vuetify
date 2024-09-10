<template>
  <v-btn v-if="activeModule === 'guest'" :to="{ path: '/get-started' }">
    <v-toolbar-title>Get Started</v-toolbar-title>
  </v-btn>
</template>

<script lang="ts">
export default {
name: 'GetStartedButton',
props: {
  activeModule: {
    type: String,
    required: true,
  },
},
}
</script>