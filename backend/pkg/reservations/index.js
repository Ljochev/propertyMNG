const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
        required: true
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

const listSortedDate = async (userId) => {
return await Reservation.find({user_id: userId}).sort({timedate: 1});
};

const getOneReservationById = async (id) => {
return await Reservation.findOne({ _id: id});
};

const getReservationsByQuery = async (id, query) => {
    console.log("The query will be:",{user_id: id,...query} );
return await Reservation.find({user_id: id,...query}).sort({timedate: 1});
}

module.exports = {
createReservation,
updateReservation,
removeReservation,
listSortedDate,
getOneReservationById,
getReservationsByQuery,
};



