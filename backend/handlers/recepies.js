const { RecepieCreate,
    RecepieUpdate,
    validateRecepie, } = require("../pkg/recepies/validate");

const {
    createRecepie,
    updateRecepie,
    removeRecepie,
    listSortetName,
    getOneRecepieById,
    } = require("../pkg/recepies/index");


const createNewRecepie = async (req, res) => {
    try {
        // await validate(req.body, RecepieCreate);
        const data = {...req.body, user_id: req.auth.id };
        const newRecepie = await createRecepie(data);
        return res.status(200).send(newRecepie);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const updateNewRecepie = async (req, res) => {
    try {
        // await validate(req.body, RecepieUpdate);
        const recepie = await getOneRecepieById(req.params.id);
        if(req.auth.id.toString() !== recepie.user_id.toString())
        return res.status(400).send("Acces not allowed");
        const updatedRecepie = await updateRecepie(req.params.id, req.body);
        return res.status(200).send(updatedRecepie);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const getRecepieById = async (req, res) => {
    try {
        const recepie = await getOneRecepieById(req.params.id);
        return res.status(200).send(recepie);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const deleteRecepie = async (req, res) => {
    try {
        const recepie = await getOneRecepieById(req.params.id);
        if(req.auth.id.toString() !== recepie.user_id.toString())
        return res.status(400).send("Acces not allowed");
        await removeRecepie(req.params.id);
        return res.status(200).send(`Recepie with id: ${req.params.id}, was deleted!`);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

const getAllRecepiesSortedByName = async (req, res) => {
    try {
        // console.log(req.auth.id);
        const recepie = await listSortetName(req.auth.id.toString());
        return res.status(200).send(recepie);
    } catch (error) {
        return res.status(500).send("internal server error!");
    }
};

    module.exports = {
    createNewRecepie,
    updateNewRecepie,
    getRecepieById,
    deleteRecepie,
    getAllRecepiesSortedByName,
    };



    // try {

    // } catch (error) {
    //     return res.status(500).send("internal server error!");
    // }