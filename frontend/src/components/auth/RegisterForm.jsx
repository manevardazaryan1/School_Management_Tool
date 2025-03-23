//  * RegistrationForm
//  *
//  * This component renders a registration form using Formik and Material-UI components.
//  * It dispatches a registerAndDispatch thunk to the Redux store upon form submission and
//  * handles navigation based on the authentication status.
//  *

import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material"
import { validationSchema } from "../../schema/registerFormValidationSchema.js"
import { useDispatch, useSelector } from "react-redux"
import { registerAndDispatch } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./AuthForm.css"

function RegistrationForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registerError = useSelector((state) => state.auth.registerError)
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if (currentUser) {
      navigate("/user")
    }
  }, [currentUser, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerAndDispatch(values))
    setSubmitting(false)
  }

  return (
    <div>
      {registerError && <p style={{ color: "red" }}>{registerError}</p>}
      <Formik
        initialValues={{ name: "", email: "", password: "", role: "PUPIL" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field as={TextField} name="name" label="Name" margin="normal" fullWidth />
            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
            <Field as={TextField} name="email" label="Email" margin="normal" fullWidth />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            <Field as={TextField} name="password" label="Password" type="password" margin="normal" fullWidth />
            <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Field as={Select} labelId="role-select-label" id="role-select" name="role" label="Role">
                <MenuItem value="PUPIL">Pupil</MenuItem>
                <MenuItem value="TEACHER">Teacher</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Field>
              <ErrorMessage name="role" component="div" style={{ color: "red" }} />
            </FormControl>
            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RegistrationForm