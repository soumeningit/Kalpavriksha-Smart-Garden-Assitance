import axios from "axios";
import { llmEndpoints } from "../API"

const {
    CHAT_WITH_LLM_API
} = llmEndpoints;

export const chatWithLLMAPI = async (question, token) => {
    try {
        const response = await axios.post(CHAT_WITH_LLM_API, {
            question
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error("Error asking AI:", error);
        throw error;
    }
}