import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { UserSignUpRequest, UserLoginRequest, UserResponse } from 'types/user';
import { useStore } from 'vuex';

// Node proxy server
const API = 'http://localhost:3000/user';

const getUser = async (id: string) => {
  try {
    const response = await axios.get(API + '/', {
      params: {
        id
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error getting user: ' + error);
  }
};

const createUser = async (user: UserSignUpRequest | null) => {
  try {
    const response = await axios.post<UserResponse>(API + '/', user);
    return response.data;
  } catch (error) {
    console.log('Error saving user: ' + error);
  }
};

const loginUser = async (user: UserLoginRequest | null) => {
  try {
    const response = await axios.post<UserResponse>(API + '/login', user);
    return response.data;
  } catch (error) {
    console.log('Error logging in user: ' + error);
  }
};

export default {
  getUser,
  createUser,
  loginUser,
};

