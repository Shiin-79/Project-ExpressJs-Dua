// Mengimpor modul Express dan kontroler yang diperlukan
import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

// Membuat router baru untuk rute pengguna
const userRoute = new express.Router();

// Menggunakan middleware otentikasi untuk semua rute di bawah ini
userRoute.use(authMiddleware);

// Rute API untuk pengguna
userRoute.get("/api/users/current", userController.get); // Mendapatkan informasi pengguna saat ini
userRoute.patch("/api/users/current", userController.update); // Memperbarui informasi pengguna saat ini
userRoute.delete("/api/users/logout", userController.logout); // Menghapus sesi pengguna (logout)

// Rute API untuk kontak
userRoute.post("/api/contacts", contactController.create); // Membuat kontak baru
userRoute.get("/api/contacts/:contactId", contactController.get); // Mendapatkan informasi kontak berdasarkan ID
userRoute.put("/api/contacts/:contactId", contactController.update); // Memperbarui informasi kontak berdasarkan ID
userRoute.delete("/api/contacts/:contactId", contactController.remove); // Menghapus kontak berdasarkan ID
userRoute.get("/api/contacts", contactController.search); // Mencari kontak berdasarkan parameter pencarian

// Rute API untuk alamat
userRoute.post("/api/contacts/:contactId/addresses", addressController.create); // Menambahkan alamat untuk kontak tertentu
userRoute.get(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.get
); // Mendapatkan alamat berdasarkan ID
userRoute.put(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.update
); // Memperbarui alamat berdasarkan ID
userRoute.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.remove
); // Menghapus alamat berdasarkan ID
userRoute.get("/api/contacts/:contactId/addresses", addressController.list); // Mendapatkan daftar alamat untuk kontak tertentu

// Mengekspor userRoute agar dapat digunakan di modul lain
export { userRoute };
