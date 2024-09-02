import * as yup from 'yup';

// Regular expression patterns
const fullNamePattern = / \S{2,}/;
const noNumsPattern = /^\D*$/;

// Define the validation schema
export const validationSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .test(
      'has-first-last-name',
      'Enter your full name',
      value => {
        if (!value) return false;
        return fullNamePattern.test(value) && noNumsPattern.test(value);
      }
    ),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .test(
      'is-valid-password',
      'Password must be at least 5 characters long',
      value => {
        if (!value) return false;
        return value.length >= 5;
      }
    ),
});
