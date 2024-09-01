<template>
    <div class="container">
        <h1>Company Details</h1>
        <form @submit.prevent="handleSubmit">
            <div v-for="(value, key) in company" :key="key" class="form-group">
                <label :for="key"> {{ displayCompany[key] }}</label>
                <input
                    v-if="key !== 'type'"
                    :type="key.charAt(0).type"
                    :id="key"
                    v-model="company[key]"
                    @input="handleInput($event, key)"
                    class="form-control"
                />
                <select
                    v-else
                    id="type"
                    v-model="company[key]"
                    class="form-select-input"
                >
                    <option 
                        v-for="(value, key) in type" :key="key"
                        :value="type[key]"
                    > 
                    {{ type[key] }}
                    </option>
                </select>
                <span v-if="errors.title">{{ errors.title }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>

<script>
import axios  from 'axios';
import { useForm } from 'vee-validate';
import moment from 'moment';
import { validationSchema } from '../validations/CompanyRegisterV';

//const API = 'http://localhost:8000'

export default {
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
data() {
    return {
        company: {
            name: '',
            headquarters: '',
            description: '',
            numEmployees: 0,
            yearStarted: '',
            industry: '',
            locations: '',
            type: '',
            round: ''
        },
        displayCompany: {
            name: 'Enter the name of the company?',
            headquarters: 'Where are you located?',
            description: 'Describe what you do.',
            numEmployees: 'How many employees do you have?',
            yearStarted: 'When was the company started?',
            industry: 'What industry are you in?',
            locations: 'What other locations do you have?',
            type: 'What type of company are you?',
            round: 'What round of funding is the company in?'
        },
        type: ['Public', 'Private', 'Government', 'Startup'],
        formattedYear: '',
        responseData: null
    }
},
methods: {
    updateYear() {
        // Validate the input to ensure it's a number and within reasonable year range
        const year = parseInt(this.company.yearStarted, 10);

        // Use moment.js to format the year
        this.formattedYear = moment(`${year}`).format('YYYY');
    },
    handleInput(event, key) {
        const value = event.target.value;
        this.company[key] = isNaN(value) ? value : parseInt(value, 10);
    }
}
};
</script>