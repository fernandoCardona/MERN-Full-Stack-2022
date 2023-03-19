//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
import { ListPosts } from "../../../components/Web/Blog";
//IMPORTS Styles/Images DE LA APP:
import './Blog.scss';

export const Blog = () => {
    return (
        <Container>
            <ListPosts />
        </Container>
    )
}
