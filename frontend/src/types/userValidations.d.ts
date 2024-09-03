declare module 'validations/UserSignUpV' {
  import { ObjectSchema } from 'yup';
  export const validationSignUpSchema: ObjectSchema<any>;
}

declare module 'validations/UserLoginV' {
  import { ObjectSchema } from 'yup';
  export const validationLoginSchema: ObjectSchema<any>;
}
