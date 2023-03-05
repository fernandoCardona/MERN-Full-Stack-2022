//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { AdminMenu, Logout } from '../../components/AdminLayout';
//IMPORTS Styles/Images DE LA APP:
import { Icon } from '../../assets';

import './AdminLayout.scss';

export const AdminLayout = (props) => {
    const { children } = props;

    
    return (
      <div className="admin-layout">
          <div className="admin-layout__left">
            <Icon.LogoWhite className="logo"/>
            <AdminMenu/>
          </div>
          <div className="admin-layout__right">
            <div className="admin-layout__right-header">
              <Logout/>
            </div>
            <div className="admin-layout__right-content">
              { children }
            </div>
          </div>
      </div>
    )
}
