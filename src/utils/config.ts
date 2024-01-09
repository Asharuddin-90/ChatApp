const isProduction = process.env.NODE_ENV === 'production';
export const API_ENDPOINT = isProduction
  ? 'https://api.example.com'
  : 'http://192.168.2.140:3030/api';
