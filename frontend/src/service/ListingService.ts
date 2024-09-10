import { ref } from 'vue';
import axios from 'axios';
import { CreateListing } from 'types/listing';

const API = 'http://localhost:3000/listing';
const errors = ref<Record<string, string>>({});

const createListing = async (listing: CreateListing | null) => {
    console.log('in listing service');
    try {
        const response = await axios.post(API + '/', listing);
        return response.data;
    } catch (error) {
        // Handle unexpected errors
        if (axios.isAxiosError(error) && error.response) {
            // Extract and set error messages from the response
            const serverErrors = error.response.data as Record<string, string>;
            return { errors: serverErrors.error };
        } else {
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }
};

const findAllByCompanyId = async (id: string | undefined) => {
    try {
        const response = await axios.get(API + '/companyid', {
            params: {
                id: id
            }
        });
        return response.data;
    } catch(error) {
        // Handle unexpected errors
        if (axios.isAxiosError(error) && error.response) {
            // Extract and set error messages from the response
            const serverErrors = error.response.data as Record<string, string>;
            return { errors: serverErrors.error };
        } else {
            return { error: 'An unexpected error occurred. Please try again.' };
        }
    }
}

export default {
    createListing,
    findAllByCompanyId
}