//IMPORTS DE REACT:
import { BrowserRouter,
  RouterProvider,
} from "react-router-dom";
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS COMPONENTS DE LA APP:
import { AdminRouter, WebRouter } from "./router";
//IMPORTS Styles DE LA APP:
import './App.css';




function App() {
  

    return (
      <BrowserRouter>
          <WebRouter/>
          <AdminRouter/>
      </BrowserRouter>
    )
}

export default App;
