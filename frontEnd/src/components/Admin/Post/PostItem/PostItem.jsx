//IMPORTS DE REACT:
import React, { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { BasicModal } from "../../../Shared";
import { PostForm } from "../PostForm"
//IMPORTS Styles/Images DE LA APP:
import "./PostItem.scss";

const postController = new Post();

export const PostItem = (props) => {
    //Importamos props:
    const { post, onReload } = props;

    //Creamos los estados:
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    //obtenemos el accessToken
    const { accessToken } = useAuth();

    //Funciones de apertura y cierre:
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    //Funcion delete:
     const onDelete = async() => {
        try {
            await postController.deletePost(accessToken, post._id);
            onReload();
            onOpenCloseConfirm();

        } catch (error) {
            console.error(error);
        }
     };

    return (
        <>
            <div className="post-item">
                <div className="post-item__info">
                    <span className="post-item__info-title">{post.title}</span>
                    <span className="post-item__info-path">{post.path}</span>
                </div>
                <div>
                    <Button as={ Link }
                            icon
                            to={`/blog/${post.path}`}
                            target='_blank'
                    >
                        <Icon name="eye"></Icon>
                    </Button>

                    <Button icon
                            primary
                            onClick={ onOpenCloseModal }
                    >
                        <Icon name="pencil"></Icon>
                    </Button>

                    <Button icon
                            color='red'
                            onClick={ onOpenCloseConfirm }
                    >
                        <Icon name="trash"></Icon>
                    </Button>
                </div>
            </div>

            <BasicModal
                show={ showModal }
                close={ onOpenCloseModal }
                title="Edit post"
                size="large"
            >
                <PostForm onClose={ onOpenCloseModal } 
                            onReload={ onReload } 
                            post={ post } 
                />
            </BasicModal>

            <Confirm
                open={ showConfirm }
                onCancel={ onOpenCloseConfirm }
                onConfirm={ onDelete }
                content={ `¿Delete ${post.title}?` }
                size="mini"
            />
        </>
    )
}
