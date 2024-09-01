//src/CompanyRegisterV.js
import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    headquarters: yup.string()
    .required('Headquarters are required.')
    .matches(
        /^[A-Za-z\s-]+, [A-Z]{2}$/,
        'Location must be in the format "city, ST"'),
    description: yup.string()
    .required('Must have a description')
    .max(500, 'Cannot contain more than 500 characters'),
    numEmployees: yup.number().required('Number of employees is required'),
    yearStarted: yup.date()
    .required('The year started must be a year')
    .test(
        'is-valid-year-range',
        'Date must be a valid year between 1000 and the current year',
        value => {
          if (!value) return false;
          
          const date = moment(value);
          const year = date.year();
          const currentYear = moment().year();
          
          // Check if the year is valid and falls within the range
          return date.isValid() && year >= 1000 && year <= currentYear;
        }
    ),
    industry: yup.string().required('Must have an industry'),
    locations: yup.string(),
    type: yup.string()
    .required('Must select a company type')
    .test(
        'is-valid-company-type',
        'Type must be one of the options',
        value => {
            if (!value) return false;

            return value.match('Public') || value.match('Private') 
                || value.match('Startup') || value.match('Government')
        }
    ),
    round: yup.string()
    .when('type', {
        is: 'Startup',
        then: yup.string().required('Startups need to share their most current round of fudning')
    })
});