import axios from "axios";

export const useApi = axios.create({
  baseURL: "https://project-sau.herokuapp.com",
  timeout: 60000,
});

export const useSymptomApi = axios.create({
  baseURL: "http://194.110.55.190:8080",
});
