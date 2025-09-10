import axios from "axios";
import { categoryEndpoints } from "../API";

const {
    GET_ALL_CATEGORIES
} = categoryEndpoints;

export const getAllCategories = async (token) => {
    try {
        const response = await axios.get(GET_ALL_CATEGORIES, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};