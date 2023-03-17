//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Image } from "semantic-ui-react";
import { map } from 'lodash';
//IMPORTS DEPENDENCIAS DE LA APP:
import { reviewsData } from "./Reviews.data";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Reviews.scss';


export const Reviews = () => {


    return (
        <Container className="reviews">
            <h2>Be part of the 150 thousand students</h2>

            <div className="reviews__list">
                {map(reviewsData, (review, index) => (
                <div key={index}>
                    <p>{review.comment}</p>
                    <div className="reviews__list-user">
                    <Image src={review.avatar} avatar />
                    <div>
                        <span>{review.userName}</span>
                        <span>{review.userType}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </Container>
    )
}
