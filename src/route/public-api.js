// Mengimpor modul Express dan kontroler pengguna
import express from "express";
import userController from "../controller/user-controller.js";

// Membuat router baru untuk rute publik
const publicRoute = new express.Router();

// Rute untuk registrasi pengguna
publicRoute.post("/api/users", userController.register);

// Rute untuk login pengguna
publicRoute.post("/api/users/login", userController.login);

// Mengekspor publicRoute agar dapat digunakan di modul lain
export { publicRoute };
