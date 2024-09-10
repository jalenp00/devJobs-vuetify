import { ref } from 'vue';
import axios from 'axios';
import { UserSignUpRequest, UserLoginRequest } from 'types/user';

// Node proxy server
const API = 'http://localhost:3000/user';
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
};

const signUpUser = async (user: UserSignUpRequest | null) => {
  try {
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
};

const loginUser = async (user: UserLoginRequest | null) => {
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
  signUpUser,
  loginUser,
};

