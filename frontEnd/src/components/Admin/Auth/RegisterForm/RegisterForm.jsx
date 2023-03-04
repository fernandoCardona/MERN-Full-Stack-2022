//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Auth } from "../../../../api"
import { initialValues, validationSchema } from './RegisterForm.form';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './RegisterForm.scss';

//instanciamos la class Auth:
const authController = new Auth();

export const RegisterForm = ( props ) => {
    //Instanciamos la funcion openLigin que viene en las props:
    const { openLogin } = props;
    //State de Error:
    const [error, setError] = useState('');
    //Definimos formik:
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            setError("");
            await authController.register(formValue);
            openLogin();
            console.log(formValue)
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
            <Form.Input 
                name="repeatPassword" 
                type="password" 
                placeholder="Repeat Password"
                onChange={ formik.handleChange } 
                value={ formik.values.repeatPassword }
                error={ formik.errors.repeatPassword }
            /> 
            <Form.Checkbox
                name="conditionsAccepted"
                label="I have read and accept the conditions of the privacy policy"
                onChange={(_, data) =>
                formik.setFieldValue("conditionsAccepted", data.checked)
                }
                checked={formik.values.conditionsAccepted}
                error={formik.errors.conditionsAccepted}
            />

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Create Account
            </Form.Button>

            <p className="register-form__error" >{error}</p>
        </Form>
    )
}
