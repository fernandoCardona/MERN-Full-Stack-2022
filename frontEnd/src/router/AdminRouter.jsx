//IMPORTS DE REACT:
import {
  Routes,
  Route,
} from "react-router-dom";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { Auth } from '../pages/admin';

//IMPORTS Styles DE LA APP:

export const AdminRouter = () => {
  return (
    <Routes>
        <Route path='/admin/*' element={<Auth />} /> 
    </Routes>
  );
}
