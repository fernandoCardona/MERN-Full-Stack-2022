//IMPORTS DE REACT:
import { useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
import { initialValues, validationSchema } from "./CourseForm.form";
//IMPORTS Styles/Images DE LA APP:
import './CourseForm.scss';

const courseController = new Course();

export const CourseForm = ( props ) => {
    //States del componente:
    const { onClose, onReload, course } = props;
    const { accessToken } = useAuth();


    //Formik:
    const formik = useFormik({
        initialValues: initialValues(course),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            //console.log(formValue);
            if (!course) {
                await courseController.createCourse(accessToken, formValue);

            } else {
                await courseController.updateCourse(
                    accessToken,
                    course._id,
                    formValue
                );
            }
    
            onReload();
            onClose();
            
          } catch (error) {
                console.error(error);
          }
        },
    });


    //Subida de imagenes dropzone:
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        //console.log(acceptedFiles);
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        onDrop,
    });

    const getMiniature = () => {
        if (formik.values.file) {
            return formik.values.miniature;
        } else if (formik.values.miniature) {
            return `${ENV.BASE_PATH}/${formik.values.miniature}`;
        }

        return null;
        
      };


    return (
        <Form className="course-form" onSubmit={ formik.handleSubmit }>
        <div className="course-form__miniature" {...getRootProps()} >
        <input {...getInputProps()} />
            {
                getMiniature() 
                ? ( <Image size="small" src={getMiniature()} /> ) 
                : ( <div>
                        <span>Drop Here Miniature</span>
                    </div> )
            }
        </div>

        <Form.Input
            name="title"
            placeholder="Nombre del curso"
            onChange={ formik.handleChange }
            value={ formik.values.title }
            error={ formik.errors.title }
        />
        <Form.Input
            name="url"
            placeholder="Link del curso"
            onChange={ formik.handleChange }
            value={ formik.values.url }
            error={ formik.errors.url }
        />
        <Form.TextArea
            name="description"
            placeholder="Pequeña descripción del curso"
            onChange={ formik.handleChange }
            value={ formik.values.description }
            error={ formik.errors.description }
        />

        <Form.Group widths="equal">
            <Form.Input
            type="number"
            name="price"
            placeholder="Precio del curso"
            onChange={ formik.handleChange }
            value={ formik.values.price }
            error={ formik.errors.price }
            />
            <Form.Input
            type="number"
            name="score"
            placeholder="Puntuacion del curso"
            onChange={ formik.handleChange }
            value={ formik.values.score }
            error={ formik.errors.score }
            />
        </Form.Group>

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
            {!course ? "Create Course" : "Update course"}
        </Form.Button>
        </Form>
    )
}
