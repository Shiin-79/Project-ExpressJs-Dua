import joi from "joi";

// Validasi untuk pendaftaran pengguna
const registerUserValidation = joi.object({
  username: joi.string().max(100).required(), // Username, maksimum 100 karakter, wajib diisi
  password: joi.string().max(100).required(), // Password, maksimum 100 karakter, wajib diisi
  name: joi.string().max(100).required(), // Nama, maksimum 100 karakter, wajib diisi
});

// Validasi untuk login pengguna
const loginUserValidation = joi.object({
  username: joi.string().max(100).required(), // Username, maksimum 100 karakter, wajib diisi
  password: joi.string().max(100).required(), // Password, maksimum 100 karakter, wajib diisi
});

// Validasi untuk mendapatkan pengguna berdasarkan username
const getUserValidation = joi.string().max(100).required(); // Username, maksimum 100 karakter, wajib diisi

// Validasi untuk memperbarui informasi pengguna
const updateUserValidation = joi.object({
  name: joi.string().max(100).optional(), // Nama, maksimum 100 karakter, opsional
  username: joi.string().max(100).required(), // Username, maksimum 100 karakter, wajib diisi
  password: joi.string().max(100).optional(), // Password, maksimum 100 karakter, opsional
});

// Mengekspor skema validasi
export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
