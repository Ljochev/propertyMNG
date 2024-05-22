const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
email: String,
password: String,
});

const Account = mongoose.model("Account", accountSchema, "accounts");

const create = async (data) => {
const newAccount = new Account(data);
return await newAccount.save();
};
const update = async (id, data) => {
return await Account.updateOne({_id: id }, {data});
};

const getById = async (id) => {
    console.log("I'm inside");
// return await Account.findOne({ _id: id });
return await Account.findById(id);
};

const getByEmail = async ( email ) => {
return await Account.findOne({ email: email});
};

const setNewPassword = async (id, password) => {
return await Account.updateOne({ _id: id }, {password});
};

const getAllEmailSorted = async () => {
// return await Account.find({}).select({"ime:"}).sort({ email: 1});
return await Account.find({}).sort({ email: 1});
};

const remove = async (id) => {
// return await Account.deleteOne({_id: id});
return await Account.findByIdAndDelete(id);
};

const updateWrongPassword = async (id, wrongPassword) => {
    wrongPassword++;
    console.log(wrongPassword);
  return await Account.updateOne({_id: id }, { wrongPassword });
  };
  const updateLogin = async (id, succesfullLog) => {
    succesfullLog++;
    return await Account.updateOne({ _id: id }, { succesfullLog });
  }
  
  const updateResetPassword = async (id, resetPassword) => {
    resetPassword++;
    return await Account.updateOne({ _id: id}, {resetPassword});
  
  };

module.exports = {
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
};