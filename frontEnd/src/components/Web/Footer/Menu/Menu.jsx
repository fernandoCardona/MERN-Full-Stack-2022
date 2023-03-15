//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Grid, GridColumn, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
//IMPORTS DEPENDENCIAS DE LA APP:
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Menu.scss';



export const Menu = () => {


    return (
        <div className="footer-menu">
            <h4>Navigation</h4>
            <Grid columns={2}>
                <Grid.Column>
                    <Link to="#">
                        <Icon name="book" /> Online Courses
                    </Link>

                    <Link to="#">
                        <Icon name="code" /> Web Develop
                    </Link>
                    
                    <Link to="#">
                        <Icon name="database" /> Data bases
                    </Link>
                    
                    <Link to="#">
                        <Icon name="code" /> UX/UI
                    </Link>                
                </Grid.Column>

                <Grid.Column>
                    <Link to="#">
                        <Icon name="server" /> Systems / servers
                    </Link>

                    <Link to="#">
                        <Icon name="cogs" /> Cms
                    </Link>
                    
                    <Link to="#">
                        <Icon name="user outline" /> Profile
                    </Link>
                    
                    <Link to="#">
                        <Icon name="python" /> Backend
                    </Link>                
                </Grid.Column>
            </Grid>

        </div>
    )
}
