//IMPORTS DE REACT:
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
//IMPORTS DEPENDENCIAS DE TERCEROS:

//IMPORTS DEPENDENCIAS DE LA APP:

//IMPORTS COMPONENTS DE LA APP:
import { Auth } from '../pages/admin';


export const AdminRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Auth />} /> 
    </Routes>
  )
}
