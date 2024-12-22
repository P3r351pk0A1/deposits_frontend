import { Api } from './Api';

const localNetworkIP = '192.168.1.20'
const baseURL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : `http://${localNetworkIP}:3000/api`;

export const api = new Api({
    baseURL: baseURL,  
    withCredentials: true    
}); 