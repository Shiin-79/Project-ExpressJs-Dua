import Joi from "joi";

// Validasi untuk membuat alamat baru
const createAddressValidation = Joi.object({
  street: Joi.string().max(255).optional(), // Jalan, maksimum 255 karakter, opsional
  city: Joi.string().max(100).optional(), // Kota, maksimum 100 karakter, opsional
  province: Joi.string().max(100).optional(), // Provinsi, maksimum 100 karakter, opsional
  country: Joi.string().max(100).required(), // Negara, maksimum 100 karakter, wajib diisi
  postal_code: Joi.string().max(10).optional(), // Kode pos, maksimum 10 karakter, opsional
});

// Validasi untuk memperbarui alamat yang sudah ada
const updateAddressValidation = Joi.object({
  id: Joi.number().min(1).positive().required(), // ID alamat, harus bilangan positif dan wajib diisi
  street: Joi.string().max(255).optional(), // Jalan, maksimum 255 karakter, opsional
  city: Joi.string().max(100).optional(), // Kota, maksimum 100 karakter, opsional
  province: Joi.string().max(100).optional(), // Provinsi, maksimum 100 karakter, opsional
  country: Joi.string().max(100).required(), // Negara, maksimum 100 karakter, wajib diisi
  postal_code: Joi.string().max(10).optional(), // Kode pos, maksimum 10 karakter, opsional
});

// Validasi untuk mengambil alamat berdasarkan ID
const getAddressValidation = Joi.number().min(1).positive().required(); // ID alamat, harus bilangan positif dan wajib diisi

export {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
};
