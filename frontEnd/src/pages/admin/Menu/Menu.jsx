//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../../components/Shared";

//IMPORTS Styles DE LA APP:
import './Menu.scss';

useState
export const Menu = () => {
  //Creamos estados;
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  //Creamos la funcion de apertura y cierre del modal:
  const onOpenCloseModal = () => setShowModal( (prevState) => !prevState );
  //Creamos la funcion de reload:
  const onReload = () => setReload( (prevState) => !prevState );

  const panes = [
    {
      menuItem: "Active menus",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={true} reload={ reload } onReload={ onReload }/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive menus",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={false} reload={ reload } onReload={ onReload } />
        </Tab.Pane>
      ),
    },
  ];

    return (
      <>
        <div className="menu-page">
            <Button className="menu-page__add" primary onClick={ onOpenCloseModal }>
              Nuevo menu
            </Button>
            <Tab menu={{ secondary: true }} panes={panes} />
        </div>
        <BasicModal show={showModal} close={ onOpenCloseModal } title="Create menu">
            <MenuForm onClose={ onOpenCloseModal } onReload={ onReload }/>
        </BasicModal>
      </>
    )
}

