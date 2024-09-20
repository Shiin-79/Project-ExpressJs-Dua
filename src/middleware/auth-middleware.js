// Mengimpor prismaClient untuk berinteraksi dengan database
import { prismaClient } from "../application/database.js";

// Middleware untuk otentikasi pengguna
export const authMiddleware = async (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.get("Authorization");

  // Memeriksa apakah token tidak ada
  if (!token) {
    // Mengirimkan respons dengan status 401 Unauthorized jika token tidak ada
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    // Mencari pengguna berdasarkan token di database
    const user = await prismaClient.user.findFirst({
      where: {
        token: token, // Mencocokkan token
      },
    });

    // Memeriksa apakah pengguna tidak ditemukan
    if (!user) {
      // Mengirimkan respons dengan status 401 Unauthorized jika pengguna tidak ditemukan
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      // Menyimpan informasi pengguna di req.user untuk digunakan di rute berikutnya
      req.user = user;
      next(); // Melanjutkan ke middleware atau rute berikutnya
    }
  }
};
