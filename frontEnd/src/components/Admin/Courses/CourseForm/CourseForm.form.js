//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:



export function initialValues(course) {
    return {
        title: course?.title || "",
        miniature: course?.miniature || "",
        file: null,
        description: course?.description || "",
        url: course?.url || "",
        price: course?.price || 0,
        score: course?.score || 1,
    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        miniature: Yup.string().required(true),
        description: Yup.string().required(true),
        url: Yup.string().required(true),
        price: Yup.number().required(true),
        score: Yup.number().min(1, true).max(5, true).required(true),
    });
}