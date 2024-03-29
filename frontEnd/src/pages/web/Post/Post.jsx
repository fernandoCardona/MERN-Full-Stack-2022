//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Post as PostController } from "../../../api";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import "./Post.scss"

const postController = new PostController();

export const Post = () => {
    const [post, setPost] = useState(null);
    const { path } = useParams();

    useEffect(() => {
        (async () => {
        try {
            const response = await postController.getPost(path);
            setPost(response);
        } catch (error) {
            console.error(error);
        }
        })();
    }, [path]);

    if (!post) return <Loader active inline="centered" />;

    return (
        <Container className="post">
            <h1 className="title">{post.title}</h1>

            <div
                className="content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </Container>
    );
}
