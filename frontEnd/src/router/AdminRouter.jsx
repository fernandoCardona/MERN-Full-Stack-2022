//IMPORTS DE REACT:
import { Routes, Route } from "react-router-dom";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//import { map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { useAuth } from "../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { AdminLayout } from "../layouts";
import { Auth, Blog, Courses, Menu, Newsletter, Users} from '../pages/admin';
//import { Auth } from '../pages/admin/Auth/Auth.jsx'
//IMPORTS Styles DE LA APP:


export function AdminRouter() {
    const { user } = useAuth();

    const loadLayout = (Layout, Page) => {
      return (
        <Layout>
          <Page />
        </Layout>
      );
    };

    return (
      <Routes>
        {!user ? (
          <Route path="/admin/*" element={<Auth />} />
          ) : (
            <>
              {["/admin", "/admin/blog"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={loadLayout(AdminLayout, Blog)}
                />
              ))}
              <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
              <Route
                path="/admin/courses"
                element={loadLayout(AdminLayout, Courses)}
              />
              <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
              <Route
                path="/admin/newsletter"
                element={loadLayout(AdminLayout, Newsletter)}
              />
            </>
          )}
      </Routes>
    );
}


