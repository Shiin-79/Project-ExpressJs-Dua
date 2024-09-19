import express from "express";
import userController from "../controller/user-controller.js";

const publicRaoute = new express.Router();
publicRaoute.post('/api/users', userController.register);
publicRaoute.post('/api/users/login', userController.login);


export {
    publicRaoute,
}