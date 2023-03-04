//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useAuth } from '../../../../hooks';
//IMPORTS DEPENDENCIAS DE LA APP:
import { Auth } from "../../../../api"
import { initialValues, validationSchema } from './LoginForm.form';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:


//instanciamos la class Auth:
const authController = new Auth();

export const LoginForm = () => {
    const { login } = useAuth();
    //Definimos formik:
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const response = await authController.login(formValue);

            authController.setAccessToken(response.access);
            authController.setRefreshToken(response.refresh);
            login(response.access);

          } catch (error) {
            setError("Server error");
          }
        },
    });

  return (
    <Form className="register-form" onSubmit={ formik.handleSubmit }>
            <Form.Input 
                name="email" 
                placeholder="Email" 
                onChange={ formik.handleChange } 
                value={ formik.values.email }
                error={ formik.errors.email }
            />
            <Form.Input 
                name="password" 
                type="password" 
                placeholder="Password"
                onChange={ formik.handleChange } 
                value={ formik.values.password }
                error={ formik.errors.password }
            />
            

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Login
            </Form.Button>

             
        </Form>
  )
}
