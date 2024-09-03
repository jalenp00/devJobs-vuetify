import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { UserSignUpRequest, UserLoginRequest, UserResponse } from 'types/user';
import { useStore } from 'vuex';

const API = 'http://localhost:3000';

const signUpUser = async (user: UserSignUpRequest | null) => {
  try {
    const response = await axios.post<UserResponse>(API + '/user/', user);
    return response.data;
  } catch (error) {
    console.log('Error: ' + error);
  }
};

export default {
  signUpUser
};

