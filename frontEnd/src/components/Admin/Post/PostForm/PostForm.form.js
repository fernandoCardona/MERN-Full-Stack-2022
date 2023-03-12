//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import * as Yup from "yup";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export function initialValues(post) {
    return {
      title: post?.title || "",
      path: post?.path || "",
      content: post?.content || "",
      miniature: post?.miniature || "",
      file: null,
    };
}
  
export function validationSchema() {
    return Yup.object({
      title: Yup.string().required(true),
      path: Yup.string().required(true),
      content: Yup.string().required(true),
      miniature: Yup.string().required(true),
    });
}