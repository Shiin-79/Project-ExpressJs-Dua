// Mengimpor service contactService yang menangani logika bisnis terkait kontak
import contactService from "../service/contact-service.js";
// Mengimpor logger untuk pencatatan log
import { logger } from "../application/logging.js";

// Fungsi untuk membuat kontak baru
const create = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna dari permintaan
    const request = req.body; // Mengambil data kontak dari body permintaan
    const result = await contactService.create(user, request); // Memanggil service untuk membuat kontak

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk mendapatkan kontak berdasarkan ID
const get = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL
    const result = await contactService.get(user, contactId); // Memanggil service untuk mendapatkan kontak

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk memperbarui kontak yang sudah ada
const update = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL
    const request = req.body; // Mengambil data dari body permintaan
    request.id = contactId; // Menambahkan contactId ke request

    // Memanggil service untuk memperbarui kontak
    const result = await contactService.update(user, request);

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk menghapus kontak
const remove = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL

    // Memanggil service untuk menghapus kontak
    await contactService.remove(user, contactId);

    // Mengirimkan respons dengan status 200 dan pesan "OK"
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk mencari kontak berdasarkan query
const search = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const request = {
      name: req.query.name, // Mengambil nama dari query parameter
      email: req.query.email, // Mengambil email dari query parameter
      phone: req.query.phone, // Mengambil nomor telepon dari query parameter
      page: req.query.page, // Mengambil halaman dari query parameter
      size: req.query.size, // Mengambil ukuran dari query parameter
    };

    // Memanggil service untuk mencari kontak
    const result = await contactService.search(user, request);

    // Mengirimkan respons dengan status 200 dan data hasil pencarian serta informasi paging
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Mengekspor semua fungsi sebagai bagian dari modul
export default {
  create,
  get,
  update,
  remove,
  search,
};
