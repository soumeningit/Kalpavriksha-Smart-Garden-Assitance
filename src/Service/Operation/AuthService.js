
import axios from 'axios';
import { authEndPoints } from '../API';

const {
    REGISTER_API,
    VERIFY_USER_API,
    LOGIN_API,
    FORGOT_PASSWORD_API,
    RESET_PASSWORD_API,
    REGISTER_WITH_GOOGLE_API,
    LOGIN_WITH_GOOGLE_API,
    REGISTER_WITH_GITHUB_API,
    LOGIN_WITH_GITHUB_API,
    GET_OAUTH_USER_DETAILS,
    LOG_OUT_API,
    UPDATE_PASSWORD_API,
    REFRESH_TOKEN_API
} = authEndPoints;

export const registerUserAPI = async (data) => {
    try {
        const response = await axios.post(REGISTER_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error registering user');
    }
}

export const verifyUserAPI = async (data) => {
    try {
        const response = await axios.put(VERIFY_USER_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loginUserAPI = async (data) => {
    try {
        const response = await axios.post(LOGIN_API, data, {
            withCredentials: true, // <- important
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error logging in user');
    }
}

export const forgotPasswordAPI = async (data) => {
    try {
        const response = await axios.post(FORGOT_PASSWORD_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error in forgot password');
    }
}

export const resetPasswordAPI = async (data) => {
    try {
        const response = await axios.post(RESET_PASSWORD_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error resetting password');
    }
}

export const registerWithGoogleAPI = async (data) => {
    try {
        const response = await axios.post(REGISTER_WITH_GOOGLE_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error registering with Google');
    }
}
export const loginWithGoogleAPI = async (data) => {
    try {
        const response = await axios.post(LOGIN_WITH_GOOGLE_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error logging in with Google');
    }
}

export const registerWithGitHubAPI = async (data) => {
    try {
        const response = await axios.post(REGISTER_WITH_GITHUB_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error registering with GitHub');
    }
}

export const loginWithGitHubAPI = async (data) => {
    try {
        const response = await axios.post(LOGIN_WITH_GITHUB_API, data);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error logging in with GitHub');
    }
}

export const getOAuthUserDetails = async () => {
    try {
        const response = await axios.get(GET_OAUTH_USER_DETAILS);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching OAuth user details');
    }
}

export const logoutUserAPI = async () => {
    try {
        const response = await axios.post(LOG_OUT_API, {}, {
            withCredentials: true, // <- important
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error logging out user');
    }
}

export const updatePasswordAPI = async (data, token) => {
    try {
        const response = await axios.put(UPDATE_PASSWORD_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const refreshTokenAPI = async () => {
    try {
        const response = await axios.post(REFRESH_TOKEN_API, {}, {
            withCredentials: true, // <- important
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error('Error refreshing token');
    }
}
