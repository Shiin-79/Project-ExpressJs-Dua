import joi from "joi";

// Validasi untuk membuat kontak baru
const createContactValidation = joi.object({
  first_name: joi.string().max(100).required(), // Nama depan, maksimum 100 karakter, wajib diisi
  last_name: joi.string().max(100).optional(), // Nama belakang, maksimum 100 karakter, opsional
  email: joi.string().max(200).optional(), // Email, maksimum 200 karakter, opsional
  phone: joi.string().max(20).required(), // Telepon, maksimum 20 karakter, wajib diisi
});

// Validasi untuk mengambil kontak berdasarkan ID
const getContactValidation = joi.number().positive().required(); // ID kontak, harus bilangan positif dan wajib diisi

// Validasi untuk memperbarui kontak yang sudah ada
const updateContactValidation = joi.object({
  id: joi.number().positive().required(), // ID kontak, harus bilangan positif dan wajib diisi
  first_name: joi.string().max(100).optional(), // Nama depan, maksimum 100 karakter, opsional
  last_name: joi.string().max(100).optional(), // Nama belakang, maksimum 100 karakter, opsional
  email: joi.string().max(200).email().optional(), // Email, maksimum 200 karakter, harus valid jika diisi
  phone: joi.string().max(20).optional(), // Telepon, maksimum 20 karakter, opsional
});

// Validasi untuk mencari kontak
const searchContactValidation = joi.object({
  page: joi.number().min(1).positive().default(1), // Halaman pencarian, harus bilangan positif, default 1
  size: joi.number().min(1).max(100).positive().default(10), // Jumlah kontak per halaman, harus bilangan positif, default 10
  name: joi.string().optional(), // Nama untuk pencarian, opsional
  email: joi.string().optional(), // Email untuk pencarian, opsional
  phone: joi.string().optional(), // Telepon untuk pencarian, opsional
});

// Mengekspor skema validasi
export {
  createContactValidation,
  getContactValidation,
  updateContactValidation,
  searchContactValidation,
};
