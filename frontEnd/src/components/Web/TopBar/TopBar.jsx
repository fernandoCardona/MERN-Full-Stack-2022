//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Container, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Menu } from '../../../api';
import { socialData } from '../../../utils';
//IMPORTS COMPONENTS DE LA APP:
import { Icon } from '../../../assets';
//IMPORTS Styles/Images DE LA APP:
import './TopBar.scss'
import { useEffect, useState } from "react";

const menuController = new Menu();
export const TopBar = () => {
    //Creamos los Estados:
    const [menu, setMenu] = useState(null);
    //console.log(menu)
    useEffect(() => {
        ( async() => {
            try {
                const response = await menuController.getMenu(true);
                setMenu(response);
            } catch (error) {
                console.error(error)
            }
        })()
    }, []);



    return (
        <div className="top-bar">
            <Container>
                <div className="top-bar__left">
                    <Link to='/' className="logo">
                        <Icon.LogoWhite />
                    </Link>
                    <div className="menu">
                        {map(menu, (item) => (
                        <a key={item._id} href={item.path}> {item.title} </a>
                        ))}
                    </div>
                </div>
                <div>
                    {map(socialData, (social) => (
                        <Button
                            key={ social.type }
                            as="a"
                            target="_blank"
                            href={ social.link } 
                            color={ social.type }
                            icon={ social.type }
                        />
                    ))}
                </div>
            </Container>
        </div>
  )
}
