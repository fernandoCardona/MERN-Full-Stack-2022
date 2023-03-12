//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { ListEmails } from "../../../components/Admin/Newsletter/ListEmails"; 
//IMPORTS Styles/Images DE LA APP:


export const Newsletter = () => {
  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListEmails />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="newsletter-page">
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  );
}
