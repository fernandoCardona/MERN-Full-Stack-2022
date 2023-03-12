//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container } from "semantic-ui-react";
//IMPORTS DEPENDENCIAS DE LA APP:
import { TopBar } from "../../components/Web";
//IMPORTS COMPONENTS DE LA APP:
import "./ClientLayout.scss";

export const clientLayaout = (props) => {
    const { children } = props;


    return (
        <div className="client-layout">
            <div className="client-layout__header">
                <TopBar />
            </div>

            { children }

            <div className="client-layout__footer">
                <Container>
                    <span>INFO</span>
                    <span>MENU</span>
                    <span>NEWSLETTER</span>
                </Container>
                <Container>
                    <span>© ALL RIGHTS RESERVED</span>
                    <span>LION ROBOTICS S.L | FRONTEND DEVELOPERS</span>
                </Container>
            </div>
        </div>
    )
}
