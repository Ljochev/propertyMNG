const { Validator } = require("node-input-validator");

const RecepieCreate = {
ime: "required|string",
"sostojki": "required|array",
"sostojki.*": "required|string",
time: "required|string",
"making": "required|array",
"making.*": "required|string",
};

const RecepieUpdate = {
    ime: "string",
    // "sostojki": "array",
    // "sostojki.*": "string",
    time: "string",
    // "making": "array",
    // "making.*": "string",
    };

const validateRecepie = async (data, schema) => {
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
RecepieCreate,
RecepieUpdate,
validateRecepie,
};