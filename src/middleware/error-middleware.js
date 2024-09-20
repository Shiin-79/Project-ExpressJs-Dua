// Mengimpor kelas ResponseError untuk menangani kesalahan khusus
import { ResponseError } from "../error/response-error.js";

// Middleware untuk menangani kesalahan
const errorMiddleware = async (err, req, res, next) => {
  // Memeriksa apakah ada kesalahan
  if (!err) {
    next(); // Jika tidak ada kesalahan, lanjutkan ke middleware berikutnya
    return;
  }

  // Memeriksa apakah kesalahan merupakan instance dari ResponseError
  if (err instanceof ResponseError) {
    // Mengirimkan respons dengan status dan pesan dari ResponseError
    res
      .status(err.status) // Menggunakan status dari ResponseError
      .json({
        errors: err.message, // Menggunakan pesan dari ResponseError
      })
      .end();
  } else {
    // Untuk kesalahan yang tidak diketahui, mengirimkan respons dengan status 500
    res
      .status(500)
      .json({
        errors: err.message, // Menggunakan pesan dari kesalahan yang tidak diketahui
      })
      .end();
  }
};

// Mengekspor middleware untuk digunakan di modul lain
export { errorMiddleware };
