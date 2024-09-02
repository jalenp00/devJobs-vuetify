
<template>
</template>

<script lang="ts">
import axios from 'axios';
import { useForm } from 'vee-validate';
import { defineComponent } from 'vue';

//@ts-ignore
//TODO: Create a declaration .d.ts file to pass in a type or use vuetify 
import { validationSchema } from '../../validations/CreateListingV.js';


const API = 'http://localhost:8000';

export default defineComponent ({
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

  const onSubmit = (values: []) => {
    //console.log(values);
  };
  return {
    handleSubmit,
    errors,
    onSubmit,
  };
},
methods: {
}
});
</script>
