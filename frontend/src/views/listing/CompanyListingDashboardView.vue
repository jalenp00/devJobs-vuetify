<template>
    <v-container>
      <v-row>
        <v-col
          v-for="listing in listings"
          :key="listing.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card>
            <v-card-title>
              {{ listing.title }}
            </v-card-title>
            <v-card-subtitle>
              User ID: {{ listing.companyUserId }}
            </v-card-subtitle>
            <v-card-text>
              Salary: {{ formatSalary(listing.salary) }}
            </v-card-text>
            <v-card-text>
              Location: {{ listing.location }}
            </v-card-text>
            <v-card-text>
              Tech-stack: {{ listing.techStack }}
            </v-card-text>
            <v-card-text>
              Years Needed: {{ listing.yearsNeeded }}
            </v-card-text>
            <v-card-text>
              Date Posted: {{ listing.datePosted }}
            </v-card-text>
            <v-card-text>
              Contract: {{ listing.contract }}
            </v-card-text>
            <v-card-text>
              Is Remote: {{ listing.remote }}
            </v-card-text>
            <v-card-text>
              Is Hybrid: {{ listing.hybrid }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { RootState } from '../../store/userStore';
  import { useRouter } from 'vue-router';
  import { CompanyListingDashboard } from '../../types/listing';
  import ListingService from '../../service/ListingService';

  export default defineComponent({
    name: 'CompanyDashboardForm',
    setup() {
        
      const router = useRouter();
      const store = useStore<RootState>();

      const companyId = ref<string>();
      const listings = ref<CompanyListingDashboard[]>();
      const isWatching = ref(true);
      

      const fetchListings = async (id: string | undefined) => {
          try {
              const response = await ListingService.findAllByCompanyId(id);
              console.log('response for getting all listings from service: ' + JSON.stringify(response));
              listings.value = response.listings;
          } catch (error) {
              console.error('Error fetching listings:', error);
          }
      };

      const formatSalary = (salary: string | number) => {
          return typeof salary === 'number'
              ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)
              : salary;
      };

      const stopWatch = watch (
          () => store.getters['companyUser/getCompanyId'],
          (newCompanyId) => {
              if (newCompanyId && isWatching.value) {
                  companyId.value = newCompanyId;
                  fetchListings(companyId.value);
                  isWatching.value = false;
              }
          },
          { immediate: true }
      );
        return {
        listings,
        formatSalary,
        };
    },
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  