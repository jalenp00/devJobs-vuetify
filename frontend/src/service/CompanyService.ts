import { CompanyRegisterRequest } from "types/company";
import { ref } from 'vue';
import axios from 'axios';

const API = 'http://localhost:3000/company';
const errors = ref<Record<string, string>>({});

const companyRegister = async (company: CompanyRegisterRequest | null) => {
    try {
        // api request
        const response = await axios.post(API + '/', company);
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
}

export default {
    companyRegister
}