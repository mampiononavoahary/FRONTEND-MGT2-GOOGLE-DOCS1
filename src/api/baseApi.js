import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:8080';

const setTokenInCookie = (token) => {
    Cookies.set('token', token, { expires: 24 });
};

const getTokenFromCookie = () => {
    return Cookies.get('token');
};

export async function Login(endpoint, _data) {
    try {
        const { data } = await axios.post(
                `${baseURL}${endpoint}`,
                _data
            );
        setTokenInCookie(data);

        return data;
    } catch (error) {
        return error;
    }
}

export async function Post(endpoint, _data) {
    try {
        const token = getTokenFromCookie();

        const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: _data,
            };

        const { data } = await axios.post(
                `${baseURL}${endpoint}`,
                config,
            );

        return data;
    } catch (error) {
        return error;
    }
}

export async function Get(endpoint, _data) {
    try {
        const token = getTokenFromCookie();

        const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: _data,
        };

        const { data } = await axios.get(
                `${baseURL}${endpoint}`,
                config,
        );

        return data;
    } catch (error) {
        return error;
    }
}

export async function Put(endpoint, _data) {
    try {
        const token = getTokenFromCookie();
        
        const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: _data
        };

        const { data } = await axios.put(
                `${baseURL}${endpoint}`,
                _data,
                config,
            );

        return data;
    } catch (error) {
        return error;
    }
}

export async function Delete(endpoint, _data) {
    try {
        const token = getTokenFromCookie();

        const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: _data,
        };

        const { data } = await axios.delete(
                `${baseURL}${endpoint}`,
                config,
            );

        return data;
    } catch (error) {
        return error;
    }
}