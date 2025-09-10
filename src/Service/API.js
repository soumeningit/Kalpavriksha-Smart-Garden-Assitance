const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL;

export const authEndPoints = {
    REGISTER_API: `${BACKEND_API_URL}/auth/register`,
    VERIFY_USER_API: `${BACKEND_API_URL}/auth/verify-user`,
    LOGIN_API: `${BACKEND_API_URL}/auth/login`,
    FORGOT_PASSWORD_API: `${BACKEND_API_URL}/auth/forgot-password`,
    RESET_PASSWORD_API: `${BACKEND_API_URL}/auth/reset-password`,
    REGISTER_WITH_GOOGLE_API: `${BACKEND_API_URL}/auth/register-with-google`,
    LOGIN_WITH_GOOGLE_API: `${BACKEND_API_URL}/auth/login-with-google`,
    REGISTER_WITH_GITHUB_API: `${BACKEND_API_URL}/auth/register-with-github`,
    LOGIN_WITH_GITHUB_API: `${BACKEND_API_URL}/auth/login-with-github`,
    GET_OAUTH_USER_DETAILS: `${BACKEND_API_URL}/Oauth/get-user-details`,
    LOG_OUT_API: `${BACKEND_API_URL}/auth/logout-user`,
    UPDATE_PASSWORD_API: `${BACKEND_API_URL}/auth/update-password`,
    REFRESH_TOKEN_API: `${BACKEND_API_URL}/auth/refresh-token/refresh`,
}

export const communityEndPoints = {
    FILE_UPLOAD_API: `${BACKEND_API_URL}/file/file-upload`,
    GET_COMMUNITY_POSTS_API: `${BACKEND_API_URL}/chat/get-community-posts`,
    ADD_LIKES_API: `${BACKEND_API_URL}/chat/add-likes`,
    ADD_COMMENTS_API: `${BACKEND_API_URL}/chat/add-comments`,
    GET_COMMENTS_API: `${BACKEND_API_URL}/chat/get-comments`,
}

export const plantEndpoints = {
    IDENTIFY_PLANT_API: `${BACKEND_API_URL}/plant/identify`,
    GET_RECENT_PLANT_IDENTIFICATIONS: `${BACKEND_API_URL}/plant/get-all-identifications-history-for-a-user`,
    GET_IDENTIFIED_PLANT_DETAILS_API: `${BACKEND_API_URL}/plant/get-identification-history-details/identificationId`,
    GET_ADVICE_API: `${BACKEND_API_URL}/plant/get-advice`,
    PROBLEM_DETECTION_API: `${BACKEND_API_URL}/plant/detect-problem`,
    GET_RECENT_PROBLEM_IDENTIFICATIONS: `${BACKEND_API_URL}/plant/get-all-problem-detection-history-for-a-user/user`,
    GET_PROBLEM_DETECTION_DETAILS_API: `${BACKEND_API_URL}/plant/get-detect-problem-history-details/documentId`,
}

export const profileEndpoints = {
    GET_USER_PROFILE_DETAILS: `${BACKEND_API_URL}/profile/get-profile-details`,
    UPDATE_USER_PROFILE_DETAILS: `${BACKEND_API_URL}/profile/update-profile-details`,
    GET_PROFILE_DETAILS: `${BACKEND_API_URL}/profile/get-user-profile-details`,
}

export const blogEndpoints = {
    FILE_UPLOAD_API: `${BACKEND_API_URL}/file/file-upload`,
    CREATE_BLOG_POST: `${BACKEND_API_URL}/blog/create-post`,
    GET_ALL_BLOG_POSTS: `${BACKEND_API_URL}/blog/get-all-public-posts`,
    GET_BLOG_POST_DETAILS: `${BACKEND_API_URL}/blog/public-get-details-of-a-post/postId`,
    GET_USER_BLOG_POSTS: `${BACKEND_API_URL}/blog/get-all-posts-of-a-user`,
    UPDATE_BLOG_POST_STATUS: `${BACKEND_API_URL}/blog/update-post-status`,
    POST_COMMENT_API: `${BACKEND_API_URL}/blogComment/post-comment`,
    GET_COMMENTS_API: `${BACKEND_API_URL}/blogComment/public-get-comments`,
    BLOG_LIKES_API: `${BACKEND_API_URL}/blog/like/post`,
    BLOG_SEARCH_API: `${BACKEND_API_URL}/blog/search/post`,
    GET_OVERVIEW_API: `${BACKEND_API_URL}/blog/get-overview`,
    DELETE_BLOG_POST: `${BACKEND_API_URL}/blog/delete-post/postId`,
    EDIT_BLOG_POST: `${BACKEND_API_URL}/blog/edit-post/postId`,
}

export const categoryEndpoints = {
    GET_ALL_CATEGORIES: `${BACKEND_API_URL}/category/get-all-categories`,
}

export const paymentEndpoints = {
    PAYMENT_API: `${BACKEND_API_URL}/payment/initiate-payment`,
    VERIFY_PAYMENT_API: `${BACKEND_API_URL}/payment/verify-payment`,
};

export const llmEndpoints = {
    CHAT_WITH_LLM_API: `${BACKEND_API_URL}/llm/ask-question`,
}
