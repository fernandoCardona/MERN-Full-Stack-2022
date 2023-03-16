//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Banner.scss';


export const Banner = () => {
  return (
    <div className="banner">
    <Container>
        <h1>Learn new Technolgies web & Mobile.</h1>
        <h2>
            Through practical, concise and updated courses, created by 
            <br/>
            professionals with years of experience.
        </h2>
    </Container>
    <div className="banner__dark"/>
        
    </div>
  )
}
