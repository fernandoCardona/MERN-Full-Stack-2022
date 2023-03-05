//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues() {
    return {
        avatar:'',
        fileAvatar: null,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: ''
    }
};

export function validationSchema(user) {
    return Yup.object({
      firstname: Yup.string().required(true),
      lastname: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      role: Yup.string().required(true),
      password: user ? Yup.string() : Yup.string().required(true),
    });
  }