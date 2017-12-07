import { userConstants } from '../constants';
import { userService } from '../services';
import {history} from "../helpers/history";
import { alertAuthenActions } from './';
import {classActions} from "./classActions";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getClassJoined,
    getClassRequest,
    createClassRequest,
    deleteClassRequest,
    approveRequestJoinClass,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure("Username or password not exist"));
                    dispatch(alertAuthenActions.error("Username or password not exist"));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertAuthenActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure("Register fail"));
                    dispatch(alertAuthenActions.error("Register fail"));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETALL_REQUEST } }
    function success(users) { return { type: userConstants.USERS_GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USERS_GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETBYID_REQUEST } }
    function success(user) { return { type: userConstants.USERS_GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USERS_GETBYID_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request());

        userService.update(user)
            .then(
                response => {
                    dispatch(success(response.data))
                    history.push(`/users/${response.data.id}`)
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_UPDATE_REQUEST } }
    function success(user) { return { type: userConstants.USERS_UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.USERS_UPDATE_FAILURE, error } }
}

function getClassJoined(userId) {
    return dispatch => {
        dispatch(request());

        userService.getClassJoined(userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETCLASSJOINED_REQUEST } }
    function success(classes) { return { type: userConstants.USERS_GETCLASSJOINED_SUCCESS, classes } }
    function failure(error) { return { type: userConstants.USERS_GETCLASSJOINED_FAILURE, error } }
}

function getClassRequest(userId) {
    return dispatch => {
        dispatch(request());

        userService.getClassRequest(userId)
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_GETCLASSREQUEST_REQUEST } }
    function success(classes) { return { type: userConstants.USERS_GETCLASSREQUEST_SUCCESS, classes } }
    function failure(error) { return { type: userConstants.USERS_GETCLASSREQUEST_FAILURE, error } }
}

function createClassRequest(userId, classId) {
    return dispatch => {
        dispatch(request());

        userService.createClassRequest(userId, classId)
            .then(
                response => {
                    dispatch(success())
                    dispatch(getClassRequest(userId))
                    dispatch(classActions.getRequests(classId))
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_CREATECLASSREQUEST_REQUEST } }
    function success() { return { type: userConstants.USERS_CREATECLASSREQUEST_SUCCESS } }
    function failure(error) { return { type: userConstants.USERS_CREATECLASSREQUEST_FAILURE, error } }
}

function deleteClassRequest(userId, classId) {
    return dispatch => {
        dispatch(request());

        userService.deleteClassRequest(userId, classId)
            .then(
                response => {
                    dispatch(success())
                    dispatch(getClassRequest(userId))
                    dispatch(classActions.getRequests(classId))
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_DELETECLASSREQUEST_REQUEST } }
    function success() { return { type: userConstants.USERS_DELETECLASSREQUEST_SUCCESS } }
    function failure(error) { return { type: userConstants.USERS_DELETECLASSREQUEST_FAILURE, error } }
}

function approveRequestJoinClass(userId, classId) {
    return dispatch => {
        dispatch(request());

        userService.approveRequestJoinClass(userId, classId)
            .then(
                response => {
                    dispatch(success())
                    dispatch(getClassJoined(userId))
                    dispatch(classActions.getMembers(classId))
                    dispatch(classActions.getRequests(classId))
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.USERS_APPROVECLASSREQUEST_REQUEST } }
    function success() { return { type: userConstants.USERS_APPROVECLASSREQUEST_SUCCESS } }
    function failure(error) { return { type: userConstants.USERS_APPROVECLASSREQUEST_FAILURE, error } }
}
