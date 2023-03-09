//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./MenuForm.form";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

const menuController = new Menu();

export const MenuForm = ( props ) => {
    //obtenemos props:
    const { onClose, onReload, menu } = props;
    const { accessToken } = useAuth();

    //Config Formik:
    const formik = useFormik({
        initialValues: initialValues(menu),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const data = {
              title: formValue.title,
              path: `${formValue.protocol}${formValue.path}`,
              order: formValue.order,
              active: formValue.active,
            };
    
            if (menu) {
              data.path = formValue.path;
              await menuController.updateMenu(accessToken, menu._id, data);

            } else {
              await menuController.createMenu(accessToken, data); 

            }
    
            onReload();
            onClose();
          } catch (error) {
                console.error(error);
          }
        },
      });

    return (
        <Form onSubmit={ formik.handleSubmit }>
            <Form.Group width="equal">
                <Form.Input 
                    name='title' 
                    placeholder="Title"
                    onChange={ formik.handleChange }
                    value={ formik.values.title }
                    error={ formik.errors.title }
                />
                <Form.Input 
                    name="order"
                    type="number"
                    placeholder="order"
                    onChange={formik.handleChange}
                    value={formik.values.order}
                    error={formik.errors.order}
                />
            </Form.Group>

            <Input
                name="path"
                placeholder="URL"
                fluid
                onChange={ formik.handleChange }
                value={ formik.values.path }
                error={ formik.errors.path }
                label={
                    !menu ? (   <Dropdown  
                                    options={ options } 
                                    onChange={
                                        (_, data) => formik.setFieldValue( 'protocol', data.value )
                                    }
                                    value={ formik.values.protocol }
                                    error={ formik.errors.protocol }
                                /> 
                            ) : null
                }
            />

            <br/> 

            <Form.Button type="submit" primary fluid loading={ formik.isSubmitting }>
                { menu ? "Update menu" : "Create Menu" }
            </Form.Button>
        </Form>
    )
}

const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "http://" },
    { key: "/", text: "/", value: "/" },
  ];