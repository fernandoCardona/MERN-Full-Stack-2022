//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { AdminMenu } from '../../components/AdminLayout';
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
              <span>LOGOUT</span>
            </div>
            <div className="admin-layout__right-content">
              { children }
            </div>
          </div>
      </div>
    )
}
