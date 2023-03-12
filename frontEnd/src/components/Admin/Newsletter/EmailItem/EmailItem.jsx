//IMPORTS DE REACT:
import { useState } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button, Icon, Confirm } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './EmailItem.scss';

const newsletterController = new Newsletter();

export const EmailItem = ( props ) => {
    //Creamos los estados:
    const { email, onReload } = props;
    const [showConfirm, setShowConfirm] = useState(false);
    const { accessToken } = useAuth();

    //Apertura y cierre del modal Confirm:
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    //Funcion delete email:
    const onDelete = async () => {
        try {
            await newsletterController.deleteEmail(accessToken, email._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
          <div className="email-item">
              <span>{email.email}</span>

              <div>
                  <Button icon color="red" onClick={ onOpenCloseConfirm }>
                    <Icon name="trash" />
                  </Button>
              </div>
          </div>

          <Confirm
              open={ showConfirm }
              onCancel={ onOpenCloseConfirm }
              onConfirm={ onDelete }
              content={`Delete ${ email.email }`}
              size="mini"
          />
    </>
    )
}
