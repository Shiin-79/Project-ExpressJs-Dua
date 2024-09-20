import { ResponseError } from "../error/response-error.js";

// Fungsi untuk memvalidasi data berdasarkan skema Joi
const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false, // Menampilkan semua kesalahan, bukan hanya yang pertama
    allowUnknown: false, // Tidak mengizinkan field yang tidak didefinisikan dalam skema
  });

  if (result.error) {
    // Jika terdapat kesalahan, lempar ResponseError dengan status 400 dan pesan kesalahan
    throw new ResponseError(400, result.error.message);
  } else {
    // Jika valid, kembalikan nilai yang telah divalidasi
    return result.value;
  }
};

export { validate };
