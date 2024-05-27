require('dotenv').config();
const express = require("express");
cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const {
    createNewUser,
    login,
    refreshToken,
    resetPassword,
    forgotPassword,
    getAllUserEmailsSorted,
} = require("./handlers/auth");

const { 
    createNewReservation,
    updateNewReservation,
    getReservationsById,
    deleteReservation,
    getAllReservationsSortedByDate,
    getReservationsBySearch,
 } = require("./handlers/reservations");


require("./pkg/db/index");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    jwt({
        secret: `${process.env.jwt_secret}`,
        algorithms: ["HS256"],
    }).unless({
        path: [
// we add the rouths we dont want to be authenticated
"/api/user/register",
"/api/user/login",
"/api/user/reset_password",
"/api/user/forgot_password",
        ],
    })
);
//auth user routs
app.get("/api/user/refresh-token", refreshToken);
app.post("/api/user/register", createNewUser);
app.post("/api/user/login", login);
app.post("/api/user/reset_password", resetPassword);
app.post("/api/user/forgot_password", forgotPassword);
app.get("/api/user/sortedEmails", getAllUserEmailsSorted);



//recepies routs
app.post("/api/reservations", createNewReservation);
app.put("/api/reservations/:id",updateNewReservation);
// app.get("/api/reservations/:id", getReservationsById);
app.delete("/api/reservations/:id", deleteReservation);
// app.get("/api/reservations", getAllReservationsSortedByDate);
app.get("/api/reservations", getReservationsBySearch);




// we form the rouths here


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});