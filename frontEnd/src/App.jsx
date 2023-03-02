//IMPORTS DE REACT:
import { useState } from 'react';

//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button } from 'semantic-ui-react';

//IMPORTS DEPENDENCIAS DE LA APP:
import './App.css';

//IMPORTS COMPONENTS DE LA APP:



function App() {
  

    return (
      <div className="App">
        <h1>App Component</h1>
        <div>
          <Button primary>Primary</Button>
          <Button secondary>Secondary</Button>
        </div>
      </div>
    )
}

export default App;
