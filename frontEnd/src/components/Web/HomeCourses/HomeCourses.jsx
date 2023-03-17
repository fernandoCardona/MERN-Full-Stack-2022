//IMPORTS DE REACT:
import { useEffect, useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { map } from 'lodash';
//IMPORTS DEPENDENCIAS DE LA APP:
import { Course } from '../../../api';
import { ENV } from '../../../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './HomeCourses.scss';


const courseController = new Course();

export const Homecourses = () => {
    //Creamos el estado:
    const [courses, setCourses] = useState(null);;

    useEffect(() => {
        (async () => {
          try {
            const response = await courseController.getCourses({ limit: 6 });
            setCourses(response.docs);
            //console.log(response.docs)
          } catch (error) {
            console.error(error);
          }
        })();
      }, []);


    return (
        <Container className="home-courses">
            <h2>learn and inprouve you habilities:</h2>
            <div className="home-courses__all-courses">
                {map(courses, (course) => (
                    <a key={course._id} href={course.url} target="_blank">
                        <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                        <div>
                        <span>{course.title}</span>
                        <span>{course.description}</span>
                        </div>
                    </a>
                ))}
            </div>
            <div className="home-courses__more">
                <Button as={Link} to="/courses" primary>
                    See more
                </Button>
            </div>
 
        </Container>
    )
}
