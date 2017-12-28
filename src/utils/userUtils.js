import {userConstants, defaultConstants, DOMAIN_SERVICE} from "../constants";

export const userUtils = {
    checkIsTeacher,
    renderFullName,
    renderSourceProfilePictureDefault,
    renderProfileImageOfUser,
    getCurrentUserId,
}

function checkIsTeacher(user) {
    if(user){
        if ( user.isTeacher ||
            (user.typeuser && user.typeuser.enum_id == userConstants.TYPE_USER_IS_TEACHER) ||
            user.typeuser == userConstants.TYPE_USER_IS_SYSTEM) {
            return true;
        }
    }
    return false;
}

function renderFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

function renderSourceProfilePictureDefault(gender) {
    // if (gender && gender.enum_id) {
    //     if (gender.enum_id.toString() == userConstants.GENDER.MALE) {
    //         return defaultConstants.USER_PROFILE_PICTURE_URL_MALE
    //     } else if (gender.enum_id.toString() == userConstants.GENDER.MALE) {
    //         return defaultConstants.USER_PROFILE_PICTURE_URL_FEMALE
    //     }
    // }

    return defaultConstants.USER_PROFILE_PICTURE_URL_NONE
}


function renderProfileImageOfUser(userId) {
    if (userId)
        return DOMAIN_SERVICE + "/users/profileImage/" + userId;
    return defaultConstants.USER_PROFILE_PICTURE_URL_NONE;
}

function getCurrentUserId() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        return user.id
    }
    return 0
}