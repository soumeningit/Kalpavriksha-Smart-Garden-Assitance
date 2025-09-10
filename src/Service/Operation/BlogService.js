import axios from "axios";
import { blogEndpoints } from "../API";

const {
    FILE_UPLOAD_API,
    CREATE_BLOG_POST,
    GET_ALL_BLOG_POSTS,
    GET_BLOG_POST_DETAILS,
    GET_USER_BLOG_POSTS,
    UPDATE_BLOG_POST_STATUS,
    POST_COMMENT_API,
    GET_COMMENTS_API,
    BLOG_LIKES_API,
    BLOG_SEARCH_API,
    GET_OVERVIEW_API,
    DELETE_BLOG_POST,
    EDIT_BLOG_POST,
} = blogEndpoints;

export const fileUploadAPI = async (data, token) => {
    try {
        const response = await axios.post(FILE_UPLOAD_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const createBlogPostAPI = async (data, token) => {
    try {
        const response = await axios.post(CREATE_BLOG_POST, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllBlogPostsAPI = async (page, size) => {
    try {
        const response = await axios.get(`${GET_ALL_BLOG_POSTS}?page=${page}&size=${size}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUserBlogPostsAPI = async (token) => {
    try {
        const response = await axios.get(GET_USER_BLOG_POSTS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateBlogPostStatusAPI = async (postId, status, token) => {
    try {
        const response = await axios.put(`${UPDATE_BLOG_POST_STATUS}/postId/${postId}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
export const getBlogPostDetailsAPI = async (postId) => {
    try {
        const response = await axios.get(`${GET_BLOG_POST_DETAILS}?postId=${postId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const postCommentAPI = async (data, token) => {
    console.log("Posting comment with data:", data);
    try {
        const response = await axios.post(POST_COMMENT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getCommentsAPI = async (postId) => {
    console.log("Fetching comments for postId:", postId);
    try {
        const response = await axios.get(`${GET_COMMENTS_API}?postId=${postId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const blogLikesAPI = async (postId, token) => {
    try {
        const response = await axios.put(`${BLOG_LIKES_API}/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const blogSearchAPI = async (token, query) => {
    try {
        const response = await axios.get(`${BLOG_SEARCH_API}?query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getOverviewAPI = async (token) => {
    try {
        const response = await axios.get(GET_OVERVIEW_API, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteBlogPostAPI = async (postId, token) => {
    try {
        const response = await axios.delete(`${DELETE_BLOG_POST}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const editBlogPostAPI = async (postId, data, token) => {
    try {
        const response = await axios.put(`${EDIT_BLOG_POST}/${postId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
