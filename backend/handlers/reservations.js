const { ReservationCreate,
    ReservationUpdate,
    validateReservation, } = require("../pkg/reservations/validate");

const {
    createReservation,
    updateReservation,
    removeReservation,
    listSortedName,
    getOneReservationById,
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

const getReservationById = async (req, res) => {
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

const getAllReservationsSortedByName = async (req, res) => {
    try {
        // console.log(req.auth.id);
        console.log(req.query.name);
        const reservation = await listSortedName(req.auth.id.toString());
        return res.status(200).send(reservation);
    } catch (error) {
        return res.status(500).send("Internal server error!");
    }
};

    module.exports = {
    createNewReservation,
    updateNewReservation,
    getReservationById,
    deleteReservation,
    getAllReservationsSortedByName,
    };



    // try {

    // } catch (error) {
    //     return res.status(500).send("internal server error!");
    // }