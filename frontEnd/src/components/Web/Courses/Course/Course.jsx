//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Image, Button, Rating } from "semantic-ui-react";
import { map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Course.scss';




export function Course(props) {
    const { course } = props;
  
    return (
      <div className="course">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
    
            <div className="course__info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <Button as="a" href={course.url} primary fluid target="_blank">
                    ENTRAR EN EL CURSO
                </Button>
        
                <div className="course__info-footer">
                    <span>{course.price} €</span>
                    <Rating
                    icon="star"
                    defaultRating={course.score}
                    maxRating={5}
                    disabled
                    />
                </div>
            </div>
      </div>
    );
  }