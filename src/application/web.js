// Mengimpor pustaka express untuk membuat aplikasi web
import express from "express";
// Mengimpor route untuk API publik
import { publicRoute } from "../route/public-api.js";
// Mengimpor route untuk API pengguna
import { userRoute } from "../route/api.js";
// Mengimpor middleware untuk menangani kesalahan
import { errorMiddleware } from "../middleware/error-middleware.js";

// Membuat instance aplikasi express
export const web = express();

// Mengatur middleware untuk parsing JSON dalam permintaan
web.use(express.json());

// Menggunakan route untuk API publik
web.use(publicRoute);

// Menggunakan route untuk API pengguna
web.use(userRoute);

// Menggunakan middleware untuk menangani kesalahan
web.use(errorMiddleware);
