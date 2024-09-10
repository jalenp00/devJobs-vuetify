<template>
  <v-container>
    <v-form ref="form" @submit.prevent="handleSubmit" v-if="listing">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-if="typeof listing[currentKey] === 'string'"
            v-model="listing[currentKey]"
            :label="displayListing[currentKey]"
            :rules="[v => !!v || 'This field is required']"
          ></v-text-field>
          <v-text-field
            v-else-if="typeof listing[currentKey] === 'number'"
            v-model="listing[currentKey]"
            :label="displayListing[currentKey]"
            type="number"
            :rules="[v => !!v || 'This field is required']"
          ></v-text-field>
          <v-checkbox
            v-else-if="typeof listing[currentKey] === 'boolean'"
            v-model="listing[currentKey]"
            :label="displayListing[currentKey]"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-btn v-if="currentIndex < keys.length - 1" @click="nextQuestion">Continue</v-btn>
      <v-btn v-else type="submit">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { useForm } from 'vee-validate';
import { defineComponent, ref, computed, watch, watchEffect } from 'vue';
import { CreateListing } from '../../types/listing';
import { useStore } from 'vuex';
import { RootState } from '../../store/userStore';
import { useRouter } from 'vue-router';
import ValidationService from  '../../validationService/listingVS';
import ListingService  from '../../service/ListingService';
import Cookies from 'js-cookie';

export default defineComponent({
  name: 'CreateListingForm',
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();

    const companyId = ref<string>();
    const listing = ref<CreateListing | null>(null);
    const isWatching = ref(true);
    const signUpError = ref<{message: string | undefined}>();

    const isFormValid = computed(() => {
      if (Object.keys(ValidationService.listingErrors.value).length === 0 && listing?.value?.companyUserId) {
        return false;
      }
      return true;
    });

    const stopWatch = watch (
      () => store.getters['companyUser/getCompanyId'],
      (newCompanyId) => {
        if (newCompanyId && isWatching.value) {
          companyId.value = newCompanyId;
          isWatching.value = false;
          // Initialize listing after companyId is available
          listing.value = {
            companyUserId: Cookies.get('companyUserId'),
            companyId: companyId.value,
            title: '',
            location: '',
            salary: 0,
            description: '',
            techStack: '',
            yearsNeeded: 0,
            contract: false,
            remote: false,
            hybrid: false,
            daysInOffice: 0,
            daysExpire: 0,
            numAppExpire: 0,
          };
          
        }
      },
      { immediate: true }
    );
    
    // Displays html 
    type ListingKeys = 'title' | 'location' | 'salary' | 'description' | 'techStack' | 'yearsNeeded' | 
      'contract' | 'remote' | 'hybrid' | 'daysInOffice' | 'daysExpire' | 'numAppExpire';


    const displayListing = {
      title: 'What is the title for this role?',
      location: 'Where is this role located?',
      salary: 'What is the salary for the role?',
      description: 'Describe the role here:',
      techStack: 'What kind of technologies does the role use?',
      yearsNeeded: 'How many years are required for this role?',
      contract: "Is this role a contracted position?",
      remote: 'Is this role remote?',
      hybrid: 'Is this role Hybrid?',
      daysInOffice: 'How many days are required to be in office?',
      daysExpire: 'In how many days would you like this listing to expire? (0 for default)',
      numAppExpire: 'After how many applications would you like this listing to expire? (0 for none)',
    };

    const currentIndex = ref(0);

    const keys = computed(() => Object.keys(displayListing) as ListingKeys[]);
    const currentKey = computed(() => keys.value[currentIndex.value]);

    const nextQuestion = () => {
      if (currentIndex.value < keys.value.length - 1) {
        currentIndex.value++;
      }
    };

    // Validation and Submission
    const validateField = async (field: string) => {
      if (listing.value) {
        ValidationService.listing.value = listing.value;
        await ValidationService.validateField(field);
      }
    };

    const handleSubmit = async () => {
      if (listing !== null) {
        ValidationService.listing.value = listing.value;
        await ValidationService.validateSubmit();
        if (isFormValid) {
          console.log('listing object: ' + JSON.stringify(listing.value));
          const response = await ListingService.createListing(listing.value);
          if (response.listing) {
            router.push('/');
          } else {
            signUpError.value = {message: response.message} || 'An unexpected error occured.';
          }
        } else {
          console.log('Error validating form: ' + JSON.stringify(ValidationService.listingErrors.value));
        }
      } else {
        console.error('User is not initialized');
      }
    }

    watch(listing, (newValue) => {
      if (newValue !== null) {
        ValidationService.listing.value = newValue;
      } else {
        // Handle the case where newValue is null, if necessary
        console.error('localUser is null');
      }
    });

    return {
      listing,
      displayListing,
      currentIndex,
      keys,
      currentKey,
      nextQuestion,
      validateField,
      handleSubmit
    };
  },
});
</script>

