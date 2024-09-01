<template>
    <v-footer
      app
      padless
      class="footer"
    >
      <v-container class="text-center">
        <v-row>
          <v-col>
            <span>This is the footer.</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #333; /* Example background color */
    color: #fff; /* Text color */
    padding: 20px 0; /* Adjust padding as needed */
  }
  .text-center {
    text-align: center;
  }

  .v-footer {
    min-width: 100lvw;
    max-height: 5pc;
  }
  </style>
  