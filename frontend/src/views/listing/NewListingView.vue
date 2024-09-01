
<template>
  <div class="container">
    <h1>Create a Listing</h1>
    <form @submit.prevent="submitForm">
      <div v-for="(value, key) in listing" :key="key" class="form-group">
        <label :for="key">{{ displayListing[key] }}</label>
        <input
          v-if="key !== 'isRemote' && key !== 'isHybrid'"
          :type="key.charAt(0).type"
          :id="key"
          v-model="listing[key]"
          @input="handleInput($event, key)"
          class="form-control"
        />
        <input
          v-else
          type="checkbox"
          :id="key"
          v-model="listing[key]"
          class="form-check-input"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-if="responseData">
      <h2>Listing Created</h2>
      <pre>{{ responseData }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { useForm } from 'vee-validate';

//@ts-ignore
//TODO: Create a declaration .d.ts file to pass in a type or use vuetify 
import { validationSchema } from '../../validations/CreateListingV.js';


const API = 'http://localhost:8000'



export default {
data() {
  return {
    listing: {
      title: '',
      location: '',
      salary: 0,
      description: '',
      techStack: '',
      yearsNeeded: 0,
      isRemote: false,
      isHybrid: false,
      daysInOffice: 0,
      daysExpire: 0,
      numAppExpire: 0,
    },
    displayListing: {
      title: 'What is the title for this role?',
      location: 'Where is this role located?',
      salary: 'What is the salary for the role?',
      description: 'Describe the role here:',
      techStack: 'What kind of technologies does the role use?',
      yearsNeeded: 'How many years are required for this role?',
      isRemote: 'Is this role remote?',
      isHybrid: 'Is this role Hybrid?',
      daysInOffice: 'How many days are required to be in office?',
      daysExpire: 'In how many days would you like this listing to expire? (0 for default)',
      numAppExpire: 'After how many applications would you like this listing to expire? (0 for none)'
    },
    responseData: null
  };
},
setup() {
  const { handleSubmit, errors } = useForm({
    validationSchema,
  });

  const onSubmit = (values) => {
    //console.log(values);
  };
  return {
    handleSubmit,
    errors,
    onSubmit,
  };
},
methods: {
  async submitForm() {
    try {
      // Convert skillsInput string to an array
      //this.listing.techStack = this.techStack.split(',').map(tech => tech.trim());
      console.log('VUE: ' + JSON.stringify(this.listing));
      // Make the POST request
      const response = await axios.post(API + '/listing/', this.listing);
      
      // Store the response data
      this.responseData = response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  },
  handleInput(event, key) {
      const value = event.target.value;
      this.listing[key] = isNaN(value) ? value : parseInt(value, 10);
    }
}
};
</script>
