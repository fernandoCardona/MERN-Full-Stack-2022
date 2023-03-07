//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
import { ListMenu } from "../../../components/Admin/Menu";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../../components/Shared";

//IMPORTS Styles DE LA APP:
import './Menu.scss';


export const Menu = () => {

  const panes = [
    {
      menuItem: "Active menus",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={true}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive menus",
      render: () => (
        <Tab.Pane attached={false}>
           <ListMenu active={false}/>
        </Tab.Pane>
      ),
    },
  ];

    return (
      <>
        <div className="menu-page">
        <Button className="menu-page__add" primary >
          Nuevo menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
      </>
    )
}

