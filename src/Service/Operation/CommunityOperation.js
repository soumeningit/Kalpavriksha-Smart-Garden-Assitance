import axios from "axios";
import { communityEndPoints } from "../API";
import toast from "react-hot-toast";

const {
    FILE_UPLOAD_API,
    GET_COMMUNITY_POSTS_API,
    ADD_LIKES_API,
    ADD_COMMENTS_API,
    GET_COMMENTS_API
} = communityEndPoints;

export const fileUploadAPI = async (data, token, userId) => {
    const toastId = toast.loading("Uploading...");
    try {
        const response = await axios.post(`${FILE_UPLOAD_API}/userId/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.dismiss(toastId);
        if (response.status === 200) {
            toast.success("File uploaded successfully!");
        }
        return response;
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("File upload failed.");
        return error;
    } finally {
        toast.dismiss(toastId);
    }
}

export const getCommunityPostsAPI = async (pageNumber, pageSize, token) => {
    console.log("In getCommunityPostsAPI " + pageNumber + " " + pageSize + " " + token);
    try {
        const response = await axios.get(`${GET_COMMUNITY_POSTS_API}?page=${pageNumber}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const addLikesAPI = async (post, token) => {
    console.log("In addLikesAPI", post);
    try {
        const response = await axios.post(ADD_LIKES_API, post, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Response from addLikesAPI:", response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const addCommentsAPI = async (postId, comment, userId, token, name) => {
    console.log("In addCommentsAPI", postId, comment);
    try {
        const response = await axios.post(ADD_COMMENTS_API, { postId, userId, comment, name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Response from addCommentsAPI:", response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getCommentsAPI = async (postId, token) => {
    console.log("In getCommentsAPI", postId);
    try {
        const response = await axios.get(`${GET_COMMENTS_API}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Response from getCommentsAPI:", response);
        return response;
    } catch (error) {
        throw error;
    }
}
