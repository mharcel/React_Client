import axios from "axios";
const api = axios.create({
    baseURL : 'https://restwithaspnetudemy20230605202436.azurewebsites.net',
})

export default api;