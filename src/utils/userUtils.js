import {userConstants, defaultConstants} from "../constants";

export const userUtils = {
    checkIsTeacher,
    renderFullName,
    renderSourceProfilePictureDefault,
}

function checkIsTeacher(user) {
    if (user && user.typeuser && user.typeuser.enum_id == userConstants.TYPE_USER_IS_TEACHER) {
        return true;
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