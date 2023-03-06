const SERVER_IP = 'localhost:4000';
export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: 'auth/register',
        LOGIN: 'auth/login',
        //User endPoins:
        USER_ME: 'user/me',
        REFRESH_ACCESS_TOKEN: 'auth/refresh_access_token',
        USER: 'user',
        USERS: 'users'

    }, 
    JWT: {
        ACCESS: 'access',
        REFRESH: 'refresh'
    }
}