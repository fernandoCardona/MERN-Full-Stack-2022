//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Post } from "../../../../api";
//IMPORTS COMPONENTS DE LA APP:
import { ListPostItem } from "../ListPostItem";
//IMPORTS Styles/Images DE LA APP:
import './ListPosts.scss';

const postController = new Post();

export const ListPosts = () => {
    //Creamos los estados:
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    //Iportante que este estado este al final:
    const [page, setPage] = useState(searchParams.get("page") || 1);

    useEffect(() => {
    (async () => {
        try {
        const response = await postController.getPosts(page, 9);
        setPosts(response.docs);
        setPagination({
            limit: response.limit,
            page: response.page,
            pages: response.pages,
            total: response.total,
        });
        } catch (error) {
        console.error(error);
        }
    })();
    }, [page]);

    const changePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage);
        navigate(`?page=${newPage}`);
    };

    if (!posts) return <Loader active inline="centered" />;

    return (
    <div className="list-posts-web">
        <div className="list">
        {map(posts, (post) => (
            <div key={post._id} className="item">
            <ListPostItem post={post} />
            </div>
        ))}
        </div>

        <div className="pagination">
        <Pagination
            totalPages={pagination.pages}
            defaultActivePage={pagination.page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            secondary
            pointing
            onPageChange={changePage}
        />
        </div>
    </div>
    );

}
