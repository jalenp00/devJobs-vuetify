<template>
    <v-btn v-if="activeModule === 'guest'" :to="{ path: '/' }">
        <v-toolbar-title>devJobs</v-toolbar-title>
    </v-btn>
    <v-btn v-if="activeModule === 'companyUser'" :to="{ path: '/company-dashboard'}">
        <v-toolbar-title>devJobs</v-toolbar-title>
    </v-btn>
    <v-btn v-if="activeModule === 'user'" :to="{ path: '/'}">
        <v-toolbar-title>devJobs</v-toolbar-title>
    </v-btn>
</template>

<script lang="ts">
export default {
  name: 'LogoButton',
  props: {
    activeModule: {
      type: String,
      required: true,
    },
  },
}
</script>