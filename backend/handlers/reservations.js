const { ReservationCreate,
    ReservationUpdate,
    validateReservation, } = require("../pkg/reservations/validate");

const {
    createReservation,
    updateReservation,
    removeReservation,
    listSortedDate,
    getOneReservationById,
    getReservationsByQuery,
    } = require("../pkg/reservations/index");


const createNewReservation = async (req, res) => {
    try {
        // await validate(req.body, ReservationCreate);
        const data = {...req.body, user_id: req.auth.id };
        const newReservation = await createReservation(data);
        return res.status(200).send(newReservation);
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
};

const updateNewReservation = async (req, res) => {
    try {
        // await validate(req.body, ReservationUpdate);
        const reservation = await getOneReservationById(req.params.id);
        if(req.auth.id.toString() !== reservation.user_id.toString())
        return res.status(400).send("Acces not allowed");
        const updatedReservation = await updateReservation(req.params.id, req.body);
        return res.status(200).send(updatedReservation);
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
};

const getReservationsById = async (req, res) => {
    try {
        const reservation = await getOneReservationById(req.params.id);
        return res.status(200).send(reservation);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await getOneReservationById(req.params.id);
        if(req.auth.id.toString() !== reservation.user_id.toString())
        return res.status(400).send("Acces not allowed");
        await removeReservation(req.params.id);
        return res.status(200).send(`Reservation with id: ${req.params.id}, was deleted!`);
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
};

const getAllReservationsSortedByDate = async (req, res) => {
    try {
        const reservation = await listSortedDate(req.auth.id.toString());
        return res.status(200).send(reservation);
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
};

const getReservationsBySearch = async (req, res) => {
    try {
        console.log("This is the req.query",req.query);
        const reservations = await getReservationsByQuery(req.auth.id, req.query);
        console.log("This is the response",reservations);
        return res.status(200).send(reservations);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
}

    module.exports = {
    createNewReservation,
    updateNewReservation,
    getReservationsById,
    deleteReservation,
    getAllReservationsSortedByDate,
    getOneReservationById,
    getReservationsBySearch,
    };



    // try {

    // } catch (error) {
    //     return res.status(500).send("internal server error!");
    // }