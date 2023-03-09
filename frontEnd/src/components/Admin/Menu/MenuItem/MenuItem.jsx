//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Icon, Confirm } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from '../../../Shared';
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { MenuForm } from '../MenuForm';
//IMPORTS Styles/Images DE LA APP:
import './MenuItem.scss';


const menuController = new Menu();

export const MenuItem = ( props ) => {
    //Obtenemos props:
    const { menu, onReload } = props;
    //Obtenemos el token:
    const { accessToken } = useAuth();
     
    //Creamos los Estados:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState(false);


    
    //Creamos la funcion de apertura y cierre del modal:
    const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
    const onOpenCloseConfirm = () => setShowConfirm( (prevState) => !prevState );
    //Creamos la funcion updateModal para actualizar el menu:
    const openUpdateMenu = () => {
        setTitleModal(`Update menu: ${ menu.title }`);
        onOpenCloseModal();
    }
    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage( 
            menu.active 
            ? `Desactivate menu ${ menu.title }` 
            : `Activate menu ${ menu.title }`
        );
        onOpenCloseConfirm();
    }
    //Funcion active/Desactive btn:
    const onActivateDesactivate = async () => {
        try {
          await menuController.updateMenu(accessToken, menu._id, {
            active: !menu.active,
          });
          onReload();
          onOpenCloseConfirm();
        } catch (error) {
          console.error(error);
        }
    };


    //Funciones Delete:
      const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Delete menu ${menu.title}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
          await menuController.deleteMenu(accessToken, menu._id);
          onReload();
          onOpenCloseConfirm();
          
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="menu-item">
                <div className="menu-item__info">
                    <span className="menu-item__info-title">
                        {menu.title}
                    </span>
                    <span className="menu-item__info-path">
                        {menu.path}
                    </span>
                </div>
                <div>
                    <Button icon primary onClick={ openUpdateMenu }> 
                        <Icon name="pencil"/>
                    </Button>

                    <Button icon 
                            color={ menu.active ? 'orange' : 'teal'}
                            onClick={ openDesactivateActivateConfirm }
                    >
                        <Icon name={ menu.active ? 'ban' : 'check'}/>
                    </Button>

                    <Button icon color='red' onClick={ openDeleteConfirm }>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>
            <BasicModal show={ showModal } close={ onOpenCloseModal } title={ titleModal }>
                <MenuForm onClose={onOpenCloseModal} onReload={onReload} menu={menu} />
            </BasicModal>
            <Confirm  
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={isDelete ? onDelete : onActivateDesactivate}
                constent={ confirmMessage } 
                size='mini'
            />
        </>
        
    )
}
