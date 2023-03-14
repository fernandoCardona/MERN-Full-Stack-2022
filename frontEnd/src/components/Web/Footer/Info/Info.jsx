//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Button } from "semantic-ui-react";
import { map } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Icon } from '../../../../assets';
import { socialData } from "../../../../utils";
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:
import './Info.scss';



export const Info = () => {


    return (
        <div className="footer-info">
            <Icon.LogoWhite className='logo' />
            <p>
                Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tu imaginacion fluya y crea verdaderas maravillas!!
            </p>
            {
                map(socialData, (social) => (
                    <Button
                        key={ social.type }
                        as='a'
                        target='_blank'
                        href={ social.link }
                        color={ social.type }
                        icon={ social.type }

                    />
                ))
            }
        </div>
    )
}
