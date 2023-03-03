//IMPORTS DE REACT:
import { Routes, Route, } from "react-router-dom";

//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { clientLayaout } from "../layouts/clientLayout/ClientLayaout";
import { Courses, Contact, Blog, Post, Home } from '../pages/web';


export const WebRouter = () => {
  //1.0- Cargamos ClientLayout:
  const loadLayout =  ( Layout, Page ) => {
    return (
        <Layout>
            <Page/>
        </Layout>
    );
    
  }

  return (
    <Routes>
      <Route path="/" element={loadLayout(clientLayaout, Home )} />
      <Route path="/courses" element={loadLayout(clientLayaout, Courses )} />
      <Route path="/contact" element={loadLayout(clientLayaout, Contact )} />
      <Route path="/blog" element={loadLayout(clientLayaout, Blog )} />
      <Route path="/blog/:path" element={loadLayout(clientLayaout, Post )} />
    </Routes>
  )
}
