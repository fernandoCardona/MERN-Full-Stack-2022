//IMPORTS DE REACT:
import { useEffect, useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from 'lodash';
//IMPORTS DEPENDENCIAS DE LA APP:
import { Course } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { CourseItem } from '../CourseItem';
//IMPORTS Styles/Images DE LA APP:
import './ListCourses.scss'

const courseController = new Course();

export const ListCourses = ( props ) => {
    const { reload, onReload } = props;
    const [courses, setCourses] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();


    useEffect(() => {
        //Creamos funcion anonima autoejecutable:
        (async() => {
            try {
                const response = await courseController.getCourses({ page });
                setCourses(response.docs);
                //console.log(response);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                });


            } catch (error) {
                console.log(error);
            }
        })()
    }, [page, reload]);

    //Validacion:
    if(!courses) return <Loader active inline='centered'/>
    if(size(courses) === 0) return 'No Courses found';

    const changePage = (_, data) => {
        //console.log(data)
        setPage(data.activePage);
    };



    return (
        <div className="list-courses">
            {
                map(courses, (course) => (
                    <CourseItem 
                        key={ course._id } 
                        course={ course } 
                        onReload={ onReload }
                    />
                ))
            }

             <div className="list-courses__pagination">
               
                <Pagination
                    totalPages={ pagination.pages }
                    defaultActivePage={ pagination.page }
                    ellipsisItem={ null }
                    firstItem={ null }
                    lastItem={ null }
                    onPageChange={ changePage }
                />
          
            </div> 
        </div>
        
    );
}
