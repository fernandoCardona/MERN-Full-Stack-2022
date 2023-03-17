//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { Banner, Homecourses, HowMyCoursesWork, Reviews } from '../../../components/Web';
 //IMPORTS Styles/Images DE LA APP:
//import './Home.scss';

export const Home = () => {
    return (
        <div>
            <Banner/>
            <Homecourses />
            <HowMyCoursesWork/>
            <Reviews/>
        </div>
        
    )
}
