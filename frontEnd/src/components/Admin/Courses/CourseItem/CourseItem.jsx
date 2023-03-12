//IMPORTS DE REACT:
import React, { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../../../../utils';
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../../Shared";
import { CourseForm } from "../CourseForm";
//IMPORTS Styles/Images DE LA APP:
import './CourseItem.scss';


const courseController = new Course();

export const CourseItem = ( props ) => {
    //Obtenemos las props:
    //console.log(props)
    const { course, onReload } = props;

    //Creamos los States:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const { accessToken } = useAuth();

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
    
    const openUpdateCourse = () => {
        setTitleModal(`Actualizar ${course.title}`);
        onOpenCloseModal();
    };
    
    const onDelete = async () => {
        try {
            await courseController.deleteCourse(accessToken, course._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <div className="course-item">
                <div className="course-item__info">
                    <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                    <div>
                        <p>{course.title}</p>
                    </div>
                </div>

                <div>
                    <Button icon as="a" href={course.url} target="_blank">
                        <Icon name="eye" />
                    </Button>
                    <Button icon primary onClick={ openUpdateCourse }>
                        <Icon name="pencil" />
                    </Button>
                    <Button icon color="red" onClick={ onOpenCloseConfirm }>
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <BasicModal show={ showModal } close={ onOpenCloseModal } title={ titleModal }>
                <CourseForm
                    onClose={ onOpenCloseModal }
                    onReload={ onReload }
                    course={ course }
                />
            </BasicModal>

            <Confirm
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={ onDelete }
                content={ `Delete course ${course.title}` }
                size="mini"
            />
        </>
    )
}
