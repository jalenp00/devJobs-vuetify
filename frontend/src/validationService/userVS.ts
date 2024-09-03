import { defineComponent, ref } from 'vue';
import { validationSignUpSchema } from '../validations/UserSignUpV';
import { validationLoginSchema } from '../validations/UserLoginV';
import { UserSignUpRequest, UserLoginRequest } from 'types/user';
import { RefSymbol } from '@vue/reactivity';


interface Errors {
  [key: string]: string;
}

// Declare user and errors refs
const user = ref<UserSignUpRequest | null>(null);
const errors = ref<Errors>({});

const validateSignUpField = async (field: string) => {
    if (!user.value) {
        errors.value[field] = 'User data is not available';
        return;
    }
    try {
        await validationSignUpSchema.validateAt(field, user.value);
    } catch (error) {
        errors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateSignUpSubmit = async () => {
    try {
        await validationSignUpSchema.validate(user.value, { abortEarly: false });
        console.log('Form is valid');
    } catch (error) {
        if ((error as any).inner) {
            (error as any).inner.forEach(({ path, message }: { path: string, message: string }) => {
                errors.value[path] = message;
            });
        }
    }
};

const validateLoginField = async (field: string) => {
    if (!user.value) {
        errors.value[field] = 'User data is not available';
        return;
    }
    try {
        await validationLoginSchema.validateAt(field, user.value);
        errors.value[field] = '';
    } catch (error) {
        errors.value[field] = (error as any).message; // Cast error to any for handling
    }
};

const validateLoginSubmit = async () => {
    try {
        await validationLoginSchema.validate(user.value, { abortEarly: false });
        console.log('Form is valid');
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
    user,
    errors
};

