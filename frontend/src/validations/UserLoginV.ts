import * as yup from 'yup';

export const validationLoginSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string()
    .required('Password is requred')
    .test(
        'is-valid-password',
        'Password must be at least 5 characters long',
        value => {
          if (!value) return false;
          if (value.length < 5) return false;
          
          // Check if the year is valid and falls within the range
          //return date.isValid() && year >= 1000 && year <= year.currentYear;
          return true;
        }
    ),
});

export default validationLoginSchema;