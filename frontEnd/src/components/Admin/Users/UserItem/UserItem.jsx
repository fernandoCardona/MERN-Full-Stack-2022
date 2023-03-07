//IMPORTS DE REACT:
import React, { useState } from 'react'
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../../../../utils';
import { UserForm } from "../UserForm";
import { User } from '../../../../api';
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from '../../../Shared';
//IMPORTS Styles/Images DE LA APP:
import { image } from '../../../../assets';
import './UserItem.scss';





const userController = new User();

export const UserItem = ( props ) => {
    const { user, onReload } = props;
    const { accessToken } = useAuth();

    //States:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMenssage, setConfirmMenssage] = useState('');
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    
    const openUpdateUser = () => { 
        setTitleModal(`Actualizar ${user.email}`);
        onOpenCloseModal();
    }
    
    const onOpenCloseConfirm = () => setShowConfirm( (prevState) => !prevState );

    const openDesactivateActivateConfirm = () =>{
        setIsDelete(false);
        setConfirmMenssage(
            user.active ? `Desactive user ${user.email}` : `Activate user ${user.email}`
        );
        onOpenCloseConfirm();

    }

    const activateDesactivate = async() =>{
        try {
            await userController.updateUser(accessToken, user._id,{ 
                active: !user.active
            });
            onReload();
            onOpenCloseConfirm();

        } catch (error) {
            throw error;
        }
    
    }

    const openDeleteConfirm = () =>{
        setIsDelete(true);
        setConfirmMenssage(`Delete user ${user.email}`);
        onOpenCloseConfirm();
    }
    const onDelete = async() =>{
        try {
            await userController.deleteUser(accessToken, user._id);
            onReload();
            onOpenCloseConfirm();
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="user-item">
                <div className="user-item__info">
                    <Image avatar 
                        src={
                            user.avatar 
                                ? `${ENV.BASE_PATH}/${user.avatar}`
                                : image.noAvatar
                        } 
                    />
                    <div>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div>
                    <Button icon primary onClick={ openUpdateUser } >
                        <Icon name="pencil"/>
                    </Button>
                    <Button icon 
                            color={ user.active ? 'orange' : 'teal'} 
                            onClick={ openDesactivateActivateConfirm }
                    >
                        <Icon name={user.active ? 'ban' : 'check'}/>
                    </Button>
                    <Button icon color='red' onClick={ openDeleteConfirm }>
                        <Icon name='trash'/>
                    </Button>
                </div>
            </div>
            <BasicModal  show={ showModal } close={ onOpenCloseModal } title={titleModal}>
                <UserForm 
                    close={ onOpenCloseModal } 
                    onReload={ onReload } 
                    user={ user }
                />
            </BasicModal>
            <Confirm
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={ isDelete ? onDelete : activateDesactivate }
                content={ confirmMenssage }
                size='mini'
            />
        </>
    )
}
