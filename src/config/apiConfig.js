const API_CLIENT_URL = 'https://client-app.resolvenergiasolar.com';
const API_BASE_URL = 'https://crm.resolvenergiasolar.com/api/mobile';

export const apiConfig = {
  client: {
    customerLogin: (cpf, date) => `${API_CLIENT_URL}/customer_login/${cpf}/${date}/`,
    customerDetails: (userId) => `${API_CLIENT_URL}/customers/${userId}/`,
  },

  crm: {
    baseUrl: API_BASE_URL,
    loginUrl: `${API_BASE_URL}/login/`,
    mobileSalesUrl: `${API_BASE_URL}/mobile_sales/`,
  },
};
