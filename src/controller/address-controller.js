// Mengimpor service addressService yang menangani logika bisnis terkait alamat
import addressService from "../service/address-service.js";

// Fungsi untuk membuat alamat baru
const create = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna dari permintaan
    const request = req.body; // Mengambil data dari body permintaan
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL

    // Memanggil service untuk membuat alamat
    const result = await addressService.create(user, contactId, request);

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk mendapatkan alamat berdasarkan ID
const get = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL
    const addressId = req.params.addressId; // Mengambil addressId dari parameter URL

    // Memanggil service untuk mendapatkan alamat
    const result = await addressService.get(user, contactId, addressId);

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk memperbarui alamat yang sudah ada
const update = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL
    const addressId = req.params.addressId; // Mengambil addressId dari parameter URL
    const request = req.body; // Mengambil data dari body permintaan
    request.id = addressId; // Menambahkan addressId ke request

    // Memanggil service untuk memperbarui alamat
    const result = await addressService.update(user, contactId, request);

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk menghapus alamat
const remove = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL
    const addressId = req.params.addressId; // Mengambil addressId dari parameter URL

    // Memanggil service untuk menghapus alamat
    const result = await addressService.remove(user, contactId, addressId);

    // Mengirimkan respons dengan status 200 dan pesan "OK"
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk mendapatkan daftar alamat
const list = async (req, res, next) => {
  try {
    const user = req.user; // Mengambil informasi pengguna
    const contactId = req.params.contactId; // Mengambil contactId dari parameter URL

    // Memanggil service untuk mendapatkan daftar alamat
    const result = await addressService.list(user, contactId);

    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
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
  list,
};
