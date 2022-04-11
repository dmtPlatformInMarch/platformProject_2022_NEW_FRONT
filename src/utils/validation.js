function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    let re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{4,10}$/;
    return re.test(String(password).toLowerCase());
}
function validatePhone(phone) {
    let re = /^\d{3,4}-\d{4}$/;
    return re.test(phone);
}
function validateDeadline(date) {
    let today = new Date();
    let arrangedDate = new Date(date);

    if (arrangedDate > today) return true;
    else false;
}
export { validateEmail, validatePassword, validatePhone, validateDeadline };
