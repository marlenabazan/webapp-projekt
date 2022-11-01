import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const tokenAndDate = storage.readToken();
        const twentyFourHours = 1000*60*60*24;
        const notExpired = (new Date().getTime() - tokenAndDate.date) < twentyFourHours;

        return tokenAndDate && notExpired;
    },
    register: async function register (email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response = await fetch(`${config.auth_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        return await response.json();
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response = await fetch(`${config.auth_url}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json()

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        await storage.storeToken(result.data.token);

        return {
            title: "Inloggning",
            message: result.data.message,
            type: "success",
        };
        
        // return result.data.message;
        
    },
    logout: async function logout() {
        await storage.deleteToken(); 
    }
};

export default auth;