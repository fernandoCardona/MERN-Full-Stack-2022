//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class User {
    baseApi = ENV.BASE_API;

    getMe = async(accessToken) => {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
          const params = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }
}