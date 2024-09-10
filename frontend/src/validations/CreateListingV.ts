// src/validationSchema.js
import * as yup from 'yup';

export const validationListingSchema = yup.object({
    title: yup.string().required('Title is required'),
    location: yup.string()
    .required('Location is required')
    .matches(
        /^[A-Za-z\s-]+, [A-Z]{2}$/,
        'Location must be in the format "city, ST"'
    ),
    salary: yup.number().required('Salary is required').positive('Salary must be positive'),
    description: yup.string().required('Description is required'),
    techStack: yup.string().required('Tech stack is required'),
    yearsNeeded: yup.number()
    .required('Years needed is required')
    .min(0, 'Years of experience must be 0 or more')
    .max(10, 'Years of expirence must be less than 10'),
    contract: yup.boolean()
    .required('Please specify if this is a contracted position or not'),
    remote: yup.boolean(),
    hybrid: yup.boolean(),
    daysInOffice: yup.number()
    .when('isHybrid', {
        // daysInOffice is only required if hybrid is true
        is: true,
        then: yup.number().required('# of days in office is required when the role is hybrid'),
    })
    .min(1, 'Number of days in office must be one or more'),
    daysExpire: yup.number(),
    numAppExpire: yup.number()
  });

  export default validationListingSchema;