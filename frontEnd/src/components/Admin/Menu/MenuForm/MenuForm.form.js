//IMPORTS DE REACT:

//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues(menu) {
    return {
        title: menu?.title || "",
        path: menu?.path || "",
        protocol: "https://",
        active: menu?.active || true,
        order: menu?.order || 0,
    }
};

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true),
    });
};