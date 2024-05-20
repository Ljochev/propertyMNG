const mongoose = require("mongoose");

const recepieSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
    },
ime: String,
sostojki: [String],
time: String,
making: [String],
});

const Recepie = mongoose.model("Recepie", recepieSchema, "Recepies");

const createRecepie = async (recepie) => {
const newRecepie = new Recepie(recepie);
return await newRecepie.save();
};

const updateRecepie = async (id, data) => {
return await Recepie.updateOne({_id: id}, data);
};

const removeRecepie = async (id) => {
return await Recepie.deleteOne({_id: id});
};

const listSortetName = async (userId) => {
return await Recepie.find({user_id: userId}).sort({ime: 1});
};

const getOneRecepieById = async (id) => {
    // console.log("I'm in getOneRecepieById");
return await Recepie.findOne({ _id: id});
};

module.exports = {
createRecepie,
updateRecepie,
removeRecepie,
listSortetName,
getOneRecepieById,
};



