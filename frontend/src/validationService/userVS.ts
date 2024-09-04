import { defineComponent, ref } from 'vue';
import { validationSignUpSchema } from '../validations/UserSignUpV';
import { validationLoginSchema } from '../validations/UserLoginV';
import { UserSignUpRequest, UserLoginRequest } from 'types/user';
import { RefSymbol } from '@vue/reactivity';


interface Errors {
  [key: string]: string;
}

// Declare user and errors refs
const userSignUp = ref<UserSignUpRequest | null>(null);
const userLogin = ref<UserLoginRequest | null>(null);
const errors = ref<Errors>({});

const validateSignUpField = async (field: string) => {
    if (!userSignUp.value) {
        errors.value[field] = 'User data is not available';
        return;
    }
    try {
        await validationSignUpSchema.validateAt(field, userSignUp.value);
        // reset errors somehow
        delete errors.value[field];
    } catch (error) {
        errors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateSignUpSubmit = async () => {
    try {
        await validationSignUpSchema.validate(userSignUp.value, { abortEarly: false });
        console.log('Form is valid');
        
        // Clear all entries in errors
        Object.keys(errors.value).forEach(key => {
            delete errors.value[key];
        });
        return true;
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                errors.value[path] = message;
            });
        }
    }
};

const validateLoginField = async (field: string) => {
    if (!userLogin.value) {
        errors.value[field] = 'User data is not available';
        return;
    }
    try {
        await validationLoginSchema.validateAt(field, userLogin.value);
        delete errors.value[field];
    } catch (error) {
        errors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateLoginSubmit = async () => {
    try {
        await validationLoginSchema.validate(userLogin.value, { abortEarly: false });
        console.log('Form is valid');

        // Clear all entries in errors
        Object.keys(errors.value).forEach(key => {
            delete errors.value[key];
        });
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                errors.value[path] = message;
            });
        }
    }
};

export default {
    validateSignUpField,
    validateSignUpSubmit,
    validateLoginField,
    validateLoginSubmit,
    userSignUp,
    userLogin,
    errors
};

