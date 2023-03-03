//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { useState } from "react";
import { Form } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './RegisterForm.scss';


export const RegisterForm = () => {
    //State de Error:
    const [error, setError] = useState('');
    
    return (
        <Form className="Register-Form">
            <Form.Input name="email" placeholder="Email"/>
            <Form.Input name="password" type="password" placeholder="Password"/>
            <Form.Input name="repeatPassword" type="password" placeholder="Repeat Password"/>
            <Form.Checkbox name="conditionAcepted" label="I have read and accept the conditions of the privacy policy"/>

            <Form.Button type="submit" primary fluid>
                Create account
            </Form.Button>

            <p className="register-form__error" >{error}</p>
        </Form>
    )
}
