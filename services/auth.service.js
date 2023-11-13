import { baseService } from './base';

const baseUrl = `/auth`;

const login = async (credentials) => {

  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  const options = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return await baseService(options).post(`${baseUrl}/login`, formData);
};

const logout = async () => {
  return await baseService().get(`${baseUrl}/logout`);
};

const mintRestrictedMacaroon = async (data) => {
  return await baseService().post(
    `${baseUrl}/token/macaroon/add_caveats`,
    data
  );
};

export const authService = {
  login,
  logout,
  mintRestrictedMacaroon
};
