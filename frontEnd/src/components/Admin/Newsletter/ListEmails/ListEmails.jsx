//IMPORTS DE REACT:
import React, { useState, useEffect } from "react";
//IMPORTS DEPENDENCIAS DE TERCEROS:
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
//IMPORTS DEPENDENCIAS DE LA APP:
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
//IMPORTS COMPONENTS DE LA APP:
import { EmailItem } from "../EmailItem";
//IMPORTS Styles/Images DE LA APP:
import './ListEmails.scss';

const newsletterController = new Newsletter();


export const ListEmails = () => {
    //creamos los estados;
    const [emails, setEmails] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);
    const { accessToken } = useAuth();
    
    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
        (async () => {
          try {
            const response = await newsletterController.getEmails(
                accessToken,
                page
            );
            setEmails(response.docs);
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
      }, [page, reload]);

    //Validacion:
    if (!emails) return <Loader active inline="centered" />;
    if (size(emails) === 0) return "No emails Found";

    const changePage = (_, data) => {
        //console.log(data)
        setPage(data.activePage);
    };

    return (
        <div className="list-emails">
        {
            map(emails, (email) => (
                <EmailItem key={ email._id } email={ email } onReload={ onReload } />
            ))
        }

      <div className="list-emails__pagination">
            <Pagination
                totalPages={ pagination.pages }
                defaultActivePage={ pagination.page }
                ellipsisItem={ false }
                firstItem={ false }
                lastItem={ false }
                onPageChange={ changePage }
            />
      </div>
    </div>
    )
}
