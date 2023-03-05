//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE LA APP:
import * as Yup from "yup";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
 
export function initialValues() {
   return {
     email: "",
     password: "",
     repeatPassword: "",
     conditionsAccepted: false,
   };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
                .email("The email is not valid")
                .required("Obligatory field"),
        password: Yup.string().required("Obligatory field"),
        repeatPassword: Yup.string()
                .required("Obligatory fieldo")
                .oneOf([Yup.ref("password")], "Passwords have to be the same"),
        conditionsAccepted: Yup.bool().isTrue(true),
    });
}
