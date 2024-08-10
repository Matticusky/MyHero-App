import BaseUrl from "./BaseUrl";

const UPLOAD_IMAGE = BaseUrl + 'api/media/upload'


const REGISTER_URL = BaseUrl + 'api/user/register/email';
const LOGIN_URL = BaseUrl + 'api/user/login/email';
const SEND_OTP = BaseUrl + 'api/user/send/otp/email';
const VERIFY_OTP = BaseUrl + 'api/user/verify-otp';
const VERIFY_EMAIL = BaseUrl + 'api/user/verify-email';
const VERIFY_AND_UPDATE_PASSWORD = BaseUrl + 'api/user/verify/password';
const GET_USER = (userID) =>BaseUrl + `api/user/${userID}`;
const GET_CLASSES =  BaseUrl + `api/class-management/classes`;

const EDIT_PROFILE = BaseUrl + 'api/user/profile'
const CHANGE_PASSWORD = BaseUrl + 'api/user/verify-and-update-password'

export const API_URLS = {
    UPLOAD_IMAGE,
    REGISTER_URL, LOGIN_URL, SEND_OTP, VERIFY_OTP, VERIFY_EMAIL, VERIFY_AND_UPDATE_PASSWORD, GET_USER, // Auth APIs
    GET_CLASSES, //Class management
    EDIT_PROFILE, CHANGE_PASSWORD, // User management
}