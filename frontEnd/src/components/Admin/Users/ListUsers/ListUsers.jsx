//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { User } from '../../../../api';

//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:


export const ListUsers = ( props ) => {
    //obtenemos las props:
    const { usersActive } = props;


    return (
        <div>
            <h1>Estamos viendo los usuariosListUsers</h1>
            <p>{ usersActive ? 'Activos' : 'Inactivos' }</p>
        </div>
    )
}
