//IMPORTS DE REACT:
import { useEffect, useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Icon } from "semantic-ui-react";
import { map } from 'lodash';
//IMPORTS DEPENDENCIAS DE LA APP:
import { itemsData } from "./HowMyCoursesWork.data";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './HowMyCoursesWork.scss';


export const HowMyCoursesWork = () => {


    return (
        <Container className="how-my-courses-work">
            <h2>¿How Courses Work?</h2>
            <h4>
                Each course has multimedia content, active 24 hours a day,
                the 365 days of the year.
            </h4>
            <div className="how-my-courses-work__items">
                {map(itemsData, (item, index) => (
                <div key={index}>
                    <div>
                        <Icon name={item.icon} />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
                ))}
            </div>

        </Container>
    )
}
