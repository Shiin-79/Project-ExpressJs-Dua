// Mengimpor service userService yang menangani logika bisnis terkait pengguna
import userService from "../service/user-service.js";

// Fungsi untuk mendaftar pengguna baru
const register = async (req, res, next) => {
  try {
    // Memanggil service untuk mendaftar pengguna
    const result = await userService.register(req.body);
    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk login pengguna
const login = async (req, res, next) => {
  try {
    // Memanggil service untuk login pengguna
    const result = await userService.login(req.body);
    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk mendapatkan informasi pengguna berdasarkan username
const get = async (req, res, next) => {
  try {
    const username = req.user.username; // Mengambil username dari informasi pengguna
    // Memanggil service untuk mendapatkan informasi pengguna
    const result = await userService.get(username);
    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk memperbarui informasi pengguna
const update = async (req, res, next) => {
  try {
    const username = req.user.username; // Mengambil username dari informasi pengguna
    const request = req.body; // Mengambil data dari body permintaan
    request.username = username; // Menambahkan username ke request

    // Memanggil service untuk memperbarui informasi pengguna
    const result = await userService.update(request);
    // Mengirimkan respons dengan status 200 dan data hasil
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk logout pengguna
const logout = async (req, res, next) => {
  try {
    // Memanggil service untuk logout pengguna
    await userService.logout(req.user.username);
    // Mengirimkan respons dengan status 200 dan pesan sukses
    res.status(200).json({
      data: {
        message: "Logout success",
      },
    });
  } catch (e) {
    next(e); // Mengalihkan kesalahan ke middleware penanganan kesalahan
  }
};

// Mengekspor semua fungsi sebagai bagian dari modul
export default {
  register,
  login,
  get,
  update,
  logout,
};
