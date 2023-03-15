//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Newsletter as NewsletterController } from "../../../../api";
import { initialValues, validationSchema } from "./Newsletter.form";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Newsletter.scss';

const newsletterController = new NewsletterController();

export const Newsletter = () => {
    //Creamos el estado:
    const [successs, setSuccesss] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setSuccesss(false);
        
            try {
                await newsletterController.registerEmail(formValue.email);
                formik.resetForm();
                setSuccesss(true);
            } catch (error) {
                console.error(error);
            }
        },
    });


    return (
        <div className="footer-newsletter">
            <h4>Newsletter</h4>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Input 
                            name="email" 
                            placeholder="your email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                />
                <Form.Button type="submit" 
                                primary 
                                fluid 
                                loading={formik.isSubmitting}
                >
                    Subcribe me!
                </Form.Button>

               {
                successs && (
                    <p className="success ">
                        Email registered successfully
                    </p>
                )
               } 
                
            </Form>
        </div>
    )
}
