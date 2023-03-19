//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Course as CourseController } from "../../../api";
import { image } from "../../../assets";
//IMPORTS COMPONENTS DE LA APP:
import { Course } from "../../../components/Web/Courses";
//IMPORTS Styles/Images DE LA APP:
import './Courses.scss';

const courseController = new CourseController();

export const Courses = () => {
    //Creamos los estados:
    const [courses, setCourses] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const isCurrentLastPage = pagination?.page === pagination?.pages;

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ page, limit: 9 });
                setPagination({
                page: response.page,
                pages: response.pages,
                });

                if (!courses) setCourses(response.docs);
                else setCourses([...courses, ...response.docs]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [page]);

    const loadMore = () => {
        setPage((prevState) => prevState + 1);
    };

    return (
        <Container className="courses-page">
            <Image src={image.academyLogo} />
            <h2>
                On the web you will find the best online programming courses in
                Spanish. Join us and start your path as a frontend programmer
                or backend.
            </h2>

            <div className="courses">
                {
                    map(courses, (course) => (
                        <div key={course._id} className="courses__item">
                            <Course course={course} />
                        </div>
                    ))
                }
            </div>  
            <div className="more">
                <Button primary 
                        onClick={loadMore}
                >
                    Load more...
                </Button>
            </div>         
        </Container>
    )
}
