<template>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Foo"
        value="foo"
      ></v-expansion-panel>

      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Bar"
        value="bar"
      ></v-expansion-panel>

      <v-expansion-panel
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        title="Baz"
        value="baz"
      ></v-expansion-panel>
        
    </v-expansion-panels>
</template>

<script lang="ts">
export default {
  data () {
    return {
      panel: [] as string[],
    }
  },
}
</script>

<style scoped>

</style>