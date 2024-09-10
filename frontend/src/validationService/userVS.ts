import { ref } from 'vue';
import { validationSignUpSchema } from '../validations/UserSignUpV';
import { validationLoginSchema } from '../validations/UserLoginV';
import { UserSignUpRequest, UserLoginRequest } from 'types/user';


interface Errors {
  [key: string]: string;
}

// Declare user and errors refs
const userSignUp = ref<UserSignUpRequest | null>(null);
const userLogin = ref<UserLoginRequest | null>(null);
const signUpErrors = ref<Errors>({});
const loginErrors = ref<Errors>({});

const validateSignUpField = async (field: string) => {
    if (!userSignUp.value) {
        signUpErrors.value[field] = 'User data is not available';
        return;
    }
    try {
        clearErrorKeyField('signup', field);
        await validationSignUpSchema.validateAt(field, userSignUp.value);
    } catch (error) {
        signUpErrors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateSignUpSubmit = async () => {
    try {
        clearErrorKeys('signup');
        await validationSignUpSchema.validate(userSignUp.value, { abortEarly: false });
        return true;
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                signUpErrors.value[path] = message;
            });
        }
    }
};

const validateLoginField = async (field: string) => {
    if (!userLogin.value) {
        loginErrors.value[field] = 'User data is not available';
        return;
    }
    try {
        clearErrorKeyField('login', field);
        await validationLoginSchema.validateAt(field, userLogin.value);
    } catch (error) {
        loginErrors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateLoginSubmit = async () => {
    try {
        clearErrorKeys('login');
        await validationLoginSchema.validate(userLogin.value, { abortEarly: false });
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                loginErrors.value[path] = message;
            });
        }
    }
};

const clearErrorKeyField = (type: string, field: string) => {
    if (type == 'login'){
        delete loginErrors.value[field];
    } else if (type == 'signup'){
        delete signUpErrors.value[field];
    }
}
const clearErrorKeys = (type: string) => {
    if (type == 'login') {
        Object.keys(loginErrors.value).forEach(key => {
            delete loginErrors.value[key];
        });
    } else if (type == 'signup') {
        Object.keys(signUpErrors.value).forEach(key => {
            delete signUpErrors.value[key];
        });
    }

}

export default {
    validateSignUpField,
    validateSignUpSubmit,
    validateLoginField,
    validateLoginSubmit,
    userSignUp,
    userLogin,
    signUpErrors,
    loginErrors
};

