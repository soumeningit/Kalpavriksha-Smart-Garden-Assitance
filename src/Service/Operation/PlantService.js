import axios from "axios";
import { plantEndpoints } from "../API";

const {
    IDENTIFY_PLANT_API,
    GET_RECENT_PLANT_IDENTIFICATIONS,
    GET_IDENTIFIED_PLANT_DETAILS_API,
    GET_ADVICE_API,
    PROBLEM_DETECTION_API,
    GET_RECENT_PROBLEM_IDENTIFICATIONS,
    GET_PROBLEM_DETECTION_DETAILS_API
} = plantEndpoints;

export const identifyPlantAPI = async (token, data, userId) => {
    try {
        const response = await axios.post(`${IDENTIFY_PLANT_API}/user/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRecentPlantIdentifications = async (token, userId) => {
    try {
        const response = await axios.get(`${GET_RECENT_PLANT_IDENTIFICATIONS}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getIdentifiedPlantDetailsAPI = async (token, identificationId) => {
    try {
        const response = await axios.get(`${GET_IDENTIFIED_PLANT_DETAILS_API}/${identificationId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAdviceAPI = async (token, crop) => {
    try {
        const response = await axios.get(`${GET_ADVICE_API}?crop=${crop}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const detectProblemAPI = async (token, data) => {
    try {
        const response = await axios.post(`${PROBLEM_DETECTION_API}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRecentProblemDetections = async (token) => {
    try {
        const response = await axios.get(`${GET_RECENT_PROBLEM_IDENTIFICATIONS}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getProblemDetectionDetailsAPI = async (token, documentId) => {
    try {
        const response = await axios.get(`${GET_PROBLEM_DETECTION_DETAILS_API}/${documentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
