import axios from "axios";
import { profileEndpoints } from "../API";

const {
    GET_USER_PROFILE_DETAILS,
    UPDATE_USER_PROFILE_DETAILS,
    GET_PROFILE_DETAILS
} = profileEndpoints;

export const getUserProfileDetailsAPI = async (token) => {
    try {
        const response = await axios.get(GET_USER_PROFILE_DETAILS, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error("Error fetching user profile details:", error);
        throw error;
    }
}

export const updateUserProfileDetailsAPI = async (token, data) => {
    try {
        const response = await axios.put(UPDATE_USER_PROFILE_DETAILS, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error updating user profile details:", error);
        throw error;
    }
}

export const getProfileDetailsAPI = async (token) => {
    try {
        const response = await axios.get(GET_PROFILE_DETAILS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching user profile details:", error);
        throw error;
    }
}
