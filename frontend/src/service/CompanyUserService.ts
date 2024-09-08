import { CompanyUserRegiserRequest, CompanyUserLoginRequest } from "types/companyUser";
import { ref } from 'vue';
import axios from 'axios';

const API = 'http://localhost:3000/companyuser';

const errors = ref<Record<string, string>>({});

const getUser = async (id: string) => {
    try {
        const response = await axios.get(API + '/', {
            params: {
                id: id
            }
        });
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

const userRegister = async (user: CompanyUserRegiserRequest) => {
    try {
        // api request
        const response = await axios.post(API + '/', user);
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

const loginUser = async (user: CompanyUserLoginRequest | null) => {
    try {
      const response = await axios.post(API + '/login', user);
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



export default {
    getUser,
    userRegister,
    loginUser
}