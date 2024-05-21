const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
    AccountRegister,
    AccountLogin,
    AccountReset,
    validate,
    } = require("./../pkg/account/validate");


    const {
        create,
        update,
        getById,
        getByEmail,
        setNewPassword,
        getAllEmailSorted,
        remove,
        updateWrongPassword,
        updateLogin,
        updateResetPassword,
        } = require("./../pkg/account/index");

const createNewUser = async (req, res) => {
    try {
        await validate(req.body, AccountRegister);
        const { email, password, confirmPassword } = req.body;
        const exist = await getByEmail( req.body.email );
        if(exist) {
            return res.status(400).send("The email already exist!");
        }
        if(password !== confirmPassword) {
            return res.status(400).send("Passwords enteres do not matched!");
        }
        req.body.password = bcrypt.hashSync(password);
        const newAccount = await create(req.body);
        return res.status(200).send(newAccount);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const login = async (req, res) => {
    try {
        await validate(req.body, AccountLogin);
        const { email, password } = req.body;
        const account = await getByEmail(email);
        if(!account) {
        return res.status(400).send("The email does not exist!");
        }
        if(!bcrypt.compareSync(password, account.password)) {
        await updateWrongPassword(account._id.toString(), account.wrongPassword);
        return res.status(400).send("Wrong password!");
        }
        const paylod = {
            fullname: account.fullname,
            email: account.email,
            id: account._id,
            exp: new Date().getTime() / 1000 + 60 * 60,
        };
        const token = jwt.sign(paylod, `${process.env.jwt_secret}`);
        if (token) {
        await updateLogin(account._id.toString(), account.succesfullLog);
        }
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const refreshToken = async (req, res) => {
    try { 
        const payload = {
            ...req.auth,
            exp:  new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
        };
        const token = jwt.sign(payload, `${process.env.jwt_secret}`);
        return res.status(200).send({ token });
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const resetPassword = async (req, res) => {
    try { 
        const { email, oldPassword, newPassword } = req.body;
        await validate(req.body, AccountReset);
        const account = await getByEmail( email);
        if(!account) {
            res.status(400).send(`The user with email: ${email}, does now exist!`);
        }
        if(!bcrypt.compareSync(oldPassword, account.password)) {
        return res.status(400).send("The old password do not match!");
        }
        if( newPassword === oldPassword)
        return res.status(400).send("The new password cannot be the same like the old password");
        req.body.newPassword = bcrypt.hashSync(req.body.newPassword);
        const userChangedPassword = await setNewPassword(account._id.toString(), req.body.newPassword);
        await updateResetPassword(account._id.toString(), account.resetPassword);
        return res.status(200).send(`The user that changed the password is: ${email}`);
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
};

const forgotPassword = async (req, res) => {
    try {
        const exist = await getByEmail(req.body.email);
        if(!exist) {
        res.status(400).send(`The user with email: ${req.body.email}, does now exist!`);
        }
        return res.send("OK");
    } catch ( error ) {
        return res.status(500).send("Internal server error");
    }
};

const getAllUserEmailsSorted = async (req, res) => {
    try {
    const allUsers = await getAllEmailSorted();
    let users = [];
    allUsers.forEach(user => {
        users.push(user.email);
    });
    console.log(req.auth);
    return res.status(200).send(users);
    } catch (error) {
    return res.status(500).send("Internal server error");
    }
};

    module.exports = {
        createNewUser,
        login,
        refreshToken,
        resetPassword,
        forgotPassword,
        getAllUserEmailsSorted,
    };