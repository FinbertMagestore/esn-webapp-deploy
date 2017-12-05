import {userConstants} from '../constants';

export function authentication(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.USERS_GETBYID_REQUEST:
            return {
                ...state
            };
        case userConstants.USERS_GETBYID_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.USERS_GETBYID_FAILURE:
            return {
                ...state
            };
        case userConstants.USERS_UPDATE_REQUEST:
            return {
                ...state
            };
        case userConstants.USERS_UPDATE_SUCCESS:
            return {
                ...state,
                user: action.user
            };
        case userConstants.USERS_UPDATE_FAILURE:
            return {
                ...state
            };

        case userConstants.USERS_GETCLASSJOINED_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.USERS_GETCLASSJOINED_SUCCESS:
            return {
                ...state,
                loading: false,
                classUserJoined: action.classes
            };
        case userConstants.USERS_GETCLASSJOINED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_GETCLASSREQUEST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.USERS_GETCLASSREQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                classUserRequest: action.classes
            };
        case userConstants.USERS_GETCLASSREQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case userConstants.USERS_GETPOSTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.USERS_GETPOSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.posts
            };
        case userConstants.USERS_GETPOSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}