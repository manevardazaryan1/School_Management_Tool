//  * validationSchema
//  *
//  * This file defines a Yup validation schema for email and password fields.
//  * It is used for form validation in the application.
//  *

import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})