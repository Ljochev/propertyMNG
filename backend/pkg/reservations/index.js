const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
    },
name: String,
timedate: Date,
email: String,
phoneNumber: String,
country: String,
price: Number,
bookingSource: String,
partyOf: Number,
});

const Reservation = mongoose.model("Reservation", reservationSchema, "reservations");

const createReservation = async (reservation) => {
    console.log("From DB",reservation)
const newReservation = new Reservation(reservation);
return await newReservation.save();
};

const updateReservation = async (id, data) => {
return await Reservation.updateOne({_id: id}, data);
};

const removeReservation = async (id) => {
return await Reservation.deleteOne({_id: id});
};

const listSortetName = async (userId) => {
return await Reservation.find({user_id: userId}).sort({name: 1});
};

const getOneReservationById = async (id) => {
    // console.log("I'm in getOneReservationById");
return await Reservation.findOne({ _id: id});
};

module.exports = {
createReservation,
updateReservation,
removeReservation,
listSortetName,
getOneReservationById,
};



