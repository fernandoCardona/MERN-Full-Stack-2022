//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Link, useLocation } from "react-router-dom";
import { Menu, Icon } from 'semantic-ui-react';
//IMPORTS DEPENDENCIAS DE LA APP:
import { useAuth } from '../../../hooks'
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './AdminMenu.scss'

export const AdminMenu = () => {
    const { pathname } = useLocation();
    //Obtenemos eltipo de role del usuario atraves del use auth:
    const { user: { role } } = useAuth();
    const isAdmin = role === 'admin';

    const isCurrentPath = ( path ) =>{
        if (path === pathname ) return true; 
        return false;
    }
    return (
        <Menu fluid vertical icon text className="admin-menu">
            {
                isAdmin &&(
                <>
                    <Menu.Item as={Link} to='/admin/users' active={isCurrentPath('/admin/users')}>
                    <Icon name='user outline'/>
                    User
                    </Menu.Item>

                    <Menu.Item as={Link} to='/admin/menu' active={isCurrentPath('/admin/menu')}>
                        <Icon name='bars'/>
                        Menu
                    </Menu.Item>

                    <Menu.Item as={Link} to='/admin/courses' active={isCurrentPath('/admin/courses')}>
                        <Icon name='computer'/>
                        Courses
                    </Menu.Item>

                    <Menu.Item as={Link} to='/admin/newsletter' active={isCurrentPath('/admin/newsletter')}>
                        <Icon name='mail'/>
                        NewsLetter
                    </Menu.Item>
                </>
                    
                )
            }
            

            <Menu.Item as={Link} to='/admin/blog' active={isCurrentPath('/admin/blog')}>
                <Icon name='comment alternate outline'/>
                Blog
            </Menu.Item>
            
        </Menu>
    );
}
