const { Validator } = require("node-input-validator");

const AccountRegister = {
email: "required|email",
password: "required|string",
confirmPassword: "required|string",
fullName: "required|string",
};

const AccountLogin = {
email: "required|email",
password: "required|string",
};

const AccountReset = {
    email: "required|email",
    oldPassword: "required|string",
    newPassword: "required|string",
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();
    if (!e) {
        throw {
            code: 400,
            error: v.errors,
        };
    }
};

module.exports = {
AccountRegister,
AccountLogin,
AccountReset,
validate,
};