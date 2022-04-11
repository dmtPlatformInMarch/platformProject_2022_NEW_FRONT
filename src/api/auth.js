// 로그인, 회원 가입, (ex) 회원 탈퇴
import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
    return instance.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
    return instance.post('login', userData);
}

function signinUser(userData) {
    return instance.post('login', userData);
}

function registerAccount(account) {
    return instance.post('register', account);
}

function logoutAccount() {
    return instance.post('logout');
}

function getCurrentAccountByEmail(email) {
    return instance.get('account', email);
}

export {
    registerUser,
    loginUser,
    registerAccount,
    signinUser,
    logoutAccount,
    getCurrentAccountByEmail,
};
