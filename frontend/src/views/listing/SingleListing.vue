<template>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">{{ listing.title }}</span>
        </v-card-title>
        <v-card-subtitle>
          <v-chip class="ma-2">{{ listing.company }}</v-chip>
          <v-chip class="ma-2">{{ listing.location }}</v-chip>
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Salary:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.salary }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Description:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Tech Stack:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.techStack }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Years Needed:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.yearsNeeded }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Date Posted:</v-list-item-title>
                    <v-list-item-subtitle>{{ formatDate(listing.datePosted) }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Contract:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.contract ? 'Yes' : 'No' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.remote !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Remote:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.remote ? 'Yes' : 'No' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.hybrid !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Hybrid:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.hybrid ? 'Yes' : 'No' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.daysInOffice !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Days In Office:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.daysInOffice }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.numApplicants !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Number of Applicants:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.numApplicants }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.daysExpire !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Days to Expire:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.daysExpire }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="listing.numAppExpire !== undefined">
                  <v-list-item-content>
                    <v-list-item-title>Number of Applications to Expire:</v-list-item-title>
                    <v-list-item-subtitle>{{ listing.numAppExpire }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CompanyListingResponse } from '../../types/listing'; // Adjust the import path
  
  export default defineComponent({
    name: 'ListingDetails',
    props: {
      listing: {
        type: Object as () => CompanyListingResponse,
        required: true
      }
    },
    setup() {
      const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      };
  
      return {
        formatDate
      };
    }
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  