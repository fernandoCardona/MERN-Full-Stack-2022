//IMPORTS DE REACT:
import { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Post } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { PostItem } from "../PostItem";
//IMPORTS Styles/Images DE LA APP:
import './ListPost.scss';

const postController = new Post();

export const ListPost = ( props ) => {
    //Obtenemos props;
    const { reload, onReload } = props;
    //Creamos los estados;
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);

    //console.log(posts)

    useEffect(() => {
        (async() => {
            try {
                const response = await postController.getPosts( page );
                setPosts(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total
                })
                

            } catch (error) {
                console.log(error);
            }
        })() 
    }, [page, reload]);

    //Validacion:
    if(!posts) return <Loader active inline='centered'/>
    if(size(posts) === 0) return 'No Posts found';

    const changePage = (_, data) => {
        //console.log(data)
        setPage(data.activePage);
    };


    return (
        <div className="list-post">
            {
                map(posts, (post) => (
                    <PostItem 
                        key={ post._id } 
                        post={ post } 
                        onReload={ onReload }
                    />
                ))
            }

             <div className="list-post__pagination">
               
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
    )
}
