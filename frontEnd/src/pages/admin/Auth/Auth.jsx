//IMPORTS DE REACT:
import React, { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { Tab } from "semantic-ui-react"
//IMPORTS COMPONENTS DE LA APP:
import { RegisterForm } from '../../../components/Admin/Auth'
//IMPORTS Styles/Images DE LA APP:
import { Icon } from "../../../assets";
import './Auth.scss';

export const Auth = () => {
    //controlala posicion de index login o Register:
    const [activeIndex, setActiveIndex] = useState(1);
    const openLogin = () => setActiveIndex(0);
    const panes = [
      {
        menuItem: "Login",
        render: () =>(
            <Tab.Pane>
                <h2>Login FORM</h2>
            </Tab.Pane>
        ),
      },
      {
        menuItem: "Register",
        render: () =>(
            <Tab.Pane>
                <RegisterForm openLogin={openLogin}/>
            </Tab.Pane>
        ),
      },
    ]

    return (
      <div className="auth">
          <Icon.LogoWhite className="logo" />
          <Tab  panes={panes} 
                className="auth__forms" 
                activeIndex={activeIndex} 
                onTabChange={(_, data) => setActiveIndex( data.activeIndex )}
          />
      </div>
      
    );
}
