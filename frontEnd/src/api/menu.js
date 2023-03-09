//IMPORTS DE REACT:
//IMPORTS DEPENDENCIAS DE TERCEROS:
//IMPORTS DEPENDENCIAS DE LA APP:
import { ENV } from '../utils';
//IMPORTS COMPONENTS DE LA APP:
//IMPORTS Styles/Images DE LA APP:

export class Menu {
    baseApi = ENV.BASE_API;

    async getMenu( active = undefined ) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}?active=${active}`;
        
          const response = await fetch(url);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;

        } catch (error) {
            throw error;
        }
    }

    async createMenu(accessToken, data) {
      try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}`;
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        };
  
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 201) throw result;
  
        return result;
      } catch (error) {
        throw error;
      }
    }

    async updateMenu(accessToken, idMenu, data) {
      try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}/${idMenu}`;
        const params = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        };
  
        const response = await fetch(url, params);
        const result = await response.json();
  
        if (response.status !== 200) throw result;
  
        return result;
      } catch (error) {
          throw error;
      }
    }

    async deleteMenu(accessToken, idMenu) {
      try {
        const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}/${idMenu}`;
        const params = {
          method: "DELETE",
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