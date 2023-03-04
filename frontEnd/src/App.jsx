//IMPORTS DE REACT:
import { BrowserRouter,
  RouterProvider,
} from "react-router-dom";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS COMPONENTS DE LA APP:
import { AdminRouter, WebRouter } from "./router";
import { AuthProvider } from "./contexts"; 
//IMPORTS Styles DE LA APP:
import './App.css';





function App() {
  

    return (
      <AuthProvider>
          <BrowserRouter>
              <WebRouter/>
              <AdminRouter/>
          </BrowserRouter>
      </AuthProvider>
      
    )
}

export default App;
