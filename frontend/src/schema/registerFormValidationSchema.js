import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]+/, 'Password must contain at least one lowercase character')
  .matches(/[A-Z]+/, 'Password must contain at least one uppercase character')
  .matches(/[0-9]+/, 'Password must contain at least one number')
  .matches(/[^a-zA-Z0-9]+/, 'Password must contain at least one special character'),
  role: Yup.string().oneOf(['PUPIL', 'TEACHER', 'ADMIN']).required('Role is required'),
});
