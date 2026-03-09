import axios from "axios";

export const clienteAxios = axios.create({
    baseURL: "http://localhost:6000",
    headers: {
        "Content-Type": "application/json"
    }
});