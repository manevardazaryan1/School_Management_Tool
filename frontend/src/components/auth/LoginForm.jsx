//  * LoginForm
//  *
//  * This component renders a login form using Formik and Material-UI components.
//  * It dispatches a login action to the Redux store upon form submission and
//  * handles navigation based on the authentication status.
//  *

import { validationSchema } from "../../schema/loginFormValidationSchema"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { TextField, Button, Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./AuthForm.css"

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginError = useSelector((state) => state.auth.loginError)
  const currentUser = useSelector((state) => state.auth.currentUser)

  useEffect(() => {
    if (currentUser) {
      navigate("/user")
    }
  }, [currentUser, navigate])

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values))
    setSubmitting(false)
  }

  return (
    <div>
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field as={TextField} name="email" label="Email" margin="normal" fullWidth />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />

            <Field as={TextField} name="password" label="Password" type="password" margin="normal" autoComplete="current-password" fullWidth />
            <ErrorMessage name="password" component="div" style={{ color: "red" }} />

            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm