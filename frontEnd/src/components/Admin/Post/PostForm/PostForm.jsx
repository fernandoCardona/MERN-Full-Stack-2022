//IMPORTS DE REACT:
import { useCallback } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from "formik";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
import { initialValues, validationSchema } from "./PostForm.form";
//IMPORTS Styles/Images DE LA APP:
import "./PostForm.scss";


const postController = new Post();

export const PostForm = ( props ) => {
    //Obtenemos props:
    const { onClose, onReload, post } = props;
    //Obtenemos accessToken de useAuth:
    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(post),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
        try {
            //console.log(formValue)
            if (post) {
                await postController.updatePost(accessToken, post._id, formValue);
            } else {
                await postController.createPost(accessToken, formValue);
            }

            onReload();
            onClose();
        } catch (error) {
            console.error(error);
        }
        },
        
    });

    //Funcion OnnDrop para subida image:
    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        formik.setFieldValue("miniature", URL.createObjectURL(file));
        formik.setFieldValue("file", file);
        //console.log(file);
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
        return null
    }

    return (
        <Form className="post-form" onSubmit={ formik.handleSubmit }>
            <Form.Group widths='equal'>
                <Form.Input name='title' 
                            placeholder='Post title'
                            onChange={ formik.handleChange }
                            value={ formik.values.title }
                            error={ formik.errors.title }
                />
                <Form.Input name='path' 
                            placeholder='Post path'
                            onChange={ formik.handleChange }
                            value={ formik.values.path }
                            error={ formik.errors.path }
                />
            </Form.Group>

            {/* Miniature */}
            <div className="post-form__miniature" { ...getRootProps()}>
                <input {...getInputProps()} />
                {
                    getMiniature() 
                    ? (<Image size='small' src={getMiniature()}/>)
                    : ( <div><span>Drop Miniature</span></div> )
                }
            </div>

            {/* Post EDITOR */}
            <Editor
                init={{
                height: 400,
                menubar: true,
                plugins: [
                    //"advlist autolink lists link image charmap print preview anchor",
                    //"searchreplace visualblocks code fullscreen",
                    //"insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                }}
                initialValue={formik.values.content}
                onBlur={(e) => formik.setFieldValue("content", e.target.getContent())}
                //onChange={(e) => console.log(e.target.getContent())}
            />

            

            <Form.Button type="submit" primary fluid loading={ formik.isSubmitting }>
                { post ? 'Update post' : 'Create Post'}
            </Form.Button >

        </Form>
    )
}
