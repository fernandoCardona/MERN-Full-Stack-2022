//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../../components/Shared";
import { UserForm } from "../../../components/Admin/Users";
//IMPORTS Styles/Images DE LA APP:
import './Users.scss';





export const Users = () => {
    //usestate:
    const [showModal, setShowModal] = useState(false);

    //Definimos la funcion onClose para cerrar el modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );

    //Manejo de Tabs:
    const panes = [
        {
            menuItem: 'Active users',
            render: () => (
                <Tab.Pane attached={false}>
                    <h2>Active Users:</h2>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Inactive users',
            render: () => (
                <Tab.Pane attached={false}>
                    <h2>Inactive Users:</h2>
                </Tab.Pane>
            ),
        },
    ];


    return (
        <>
            <div className="users-page">
                <Button 
                    className="users-page__add" 
                    primary 
                    onClick={ onOpenCloseModal }>
                        New user
                </Button>
                <Tab menu={{ secondary: true }} panes={panes} />
            </div>
            <BasicModal show={showModal} close={onOpenCloseModal} title='Create new user'>
                <UserForm close={ onOpenCloseModal }/>
            </BasicModal>
        </>
    )
}
