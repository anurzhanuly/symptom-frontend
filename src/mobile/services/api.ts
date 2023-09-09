import axios from 'axios';

export const useApi = axios.create({
    baseURL: 'https://project-sau.herokuapp.com',
    timeout: 60000,
});

export const useSymptomApi = axios.create({
    baseURL: 'https://symptom.kz:8080',
});
