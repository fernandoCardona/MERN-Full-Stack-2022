//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Tab, Button } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { BasicModal } from "../../../components/Shared";
import { ListPost, PostForm } from "../../../components/Admin/Post";
//IMPORTS COMPONENTS DE LA APP:
import "./Blog.scss";


export const Blog = () => {
    //creamos los Estados:
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    //Funcion de apertura y cierre del Modal;
    const onOpenCloseModal = () => setShowModal(( prevState ) => !prevState);
    //Funcion de recarga;
    const onReload = () => setReload(( prevState ) => !prevState);

    const panes = [
        {
          render: () => (
            <Tab.Pane attached={false}>
              <ListPost reload={ reload } onReload={ onReload }/>
            </Tab.Pane>
          ),
        },
      ];

    return (
        <>
            <div className="blog-page">

                <div className="blog-page__add">
                    <Button primary
                            onClick={ onOpenCloseModal }
                    >
                        New Poat
                    </Button>
                </div>

                <Tab menu={{ secondary: true }} panes={panes} />
            </div>

            <BasicModal show={ showModal } 
                        close={ onOpenCloseModal } 
                        title='Create new post'
                        size='large'
            >
                <PostForm   onClose={ onOpenCloseModal }
                            onReload={ onReload }
                />
            </BasicModal>
        </>
    )
}
