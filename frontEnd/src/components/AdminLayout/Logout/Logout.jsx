//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { useNavigate } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react';
//IMPORTS DEPENDENCIAS DE LA APP:
import { useAuth } from '../../../hooks';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Logout.scss';
import React from 'react';

export const Logout = () => {

    //Funcion de Logout:
    const { logout } = useAuth();
    const { navigate } = useNavigate();
    const onLogout = () =>{
        logout();
        navigate('/admin');
    }

    return (
        <Button icon basic color='red' onClick={ onLogout }>
            <Icon name='power off'/>Logout
        </Button>
    )
}
