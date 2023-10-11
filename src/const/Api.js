export const BASE_URL_= 'https://email-qg7m.vercel.app'
export const BASE_URL_AI_ = 'http://13.48.1.127:5001'
export const APIs = {
    USER: {
        SIGNUP: `${BASE_URL_}/api/users/signup`,
        LOGIN: `${BASE_URL_}/api/users/login`,
        FIND_BY_EMAIL: `${BASE_URL_}/api/users/findUserByEmail`,
    },
    CONNECT_ACCOUNT: `${BASE_URL_}/api/emails/auth`,
    GET_EMAILS: `${BASE_URL_}/api/emails/emails`,
    GET_MEETINGS: `${BASE_URL_}/api/emails/meetings`,
    GET_EMAIL_BY_ID: `${BASE_URL_}/api/emails/getEmailById/`,
    REPLY_EMAIL_BY_ID: `${BASE_URL_}/api/emails/emailsReply/`,
    REPLY_EMAIL_BY_AI: `${BASE_URL_AI_}/reply/`,
    CREAT_MEETING_BY_AI: `${BASE_URL_AI_}/api/`,
    FETCH_ALL_MEETINGS: `${BASE_URL_}/api/emails/meetings`,
    CREAT_SCHEDULE_MEETINGS: `${BASE_URL_}/api/emails/schedule-meeting`,
    SUBSCRIPTION: {
        GET_ALL_SUBSCRIPTION: `${BASE_URL_}/api/subscriptions/getAllSubscription`,
        GET_ALL_SUBSCRIPTION_BY_ID: `${BASE_URL_}/api/subscribers/getByUser/`,
        ADD_SUBSCRIPTION: `${BASE_URL_}/api/subscriptions/createSubscription`,
        UPDATE_SUBSCRIPTION: `${BASE_URL_}/api/subscriptions/updateSubscription/`,
        DELETE_SUBSCRIPTION: `${BASE_URL_}/api/subscriptions/deleteSubscription/`,
        DELETE_PLANE: `${BASE_URL_}/api/subscribers/delete/`,
        SUBSCRIBE: `${BASE_URL_}/api/subscribers/subscribe`,

    } ,
}
