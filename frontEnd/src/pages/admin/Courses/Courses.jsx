//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { ListCourses, CourseForm } from "../../../components/Admin/Courses";
//IMPORTS Styles/Images DE LA APP:
import './Courses.scss'


export const Courses = () => {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);
    //funcion de abrir y cerrar modal:
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onReload = () => setReload((prevState) => !prevState);

    const panes = [
        {
        render: () => (
            <Tab.Pane attached={false}>
                <ListCourses reload={reload} onReload={onReload} />
                 
            </Tab.Pane>
        ),
        },
    ];
    
    return (
        <>
            <div className="courses-page">
                <div className="courses-page__add">
                    <Button primary onClick={onOpenCloseModal}>
                        Nuevo curso
                    </Button>
                </div>

                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={ showModal } close={ onOpenCloseModal } title={'Create course'}>
                <CourseForm onClose={ onOpenCloseModal } onReload={ onReload }/>
            </BasicModal>
        </>
    );
}
