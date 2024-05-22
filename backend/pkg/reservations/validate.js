const { Validator } = require("node-input-validator");

const ReservationCreate = {
name: "required|string",
timedate: "number",
email: "email",
phoneNumber: "string",
country: "string",
price: "number",
bookingSource: "string",
partyOf: "number",

};

const ReservationUpdate = {
    name: "string",
    timedate: "number",
    email: "email",
    phoneNumber: "string",
    country: "string",
    price: "number",
    bookingSource: "string",
    partyOf: "number",
    };

const validateReservation = async (data, schema) => {
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
ReservationCreate,
ReservationUpdate,
validateReservation,
};