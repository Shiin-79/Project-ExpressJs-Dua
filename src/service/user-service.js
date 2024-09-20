// Mengimpor validasi, prismaClient untuk interaksi dengan database, ResponseError untuk penanganan kesalahan, bcrypt untuk hashing password, dan uuid untuk membuat token unik
import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt"; // Untuk menghash password
import { v4 as uuid } from "uuid"; // Untuk menghasilkan token unik

// Fungsi untuk mendaftar pengguna baru
const register = async (request) => {
  const user = validate(registerUserValidation, request); // Validasi data pengguna

  // Memeriksa apakah username sudah ada di database
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // Jika ada, lempar kesalahan
  if (countUser === 1) {
    throw new ResponseError(400, "Username already exists");
  }

  // Menghash password pengguna
  user.password = await bcrypt.hash(user.password, 10);

  // Menyimpan pengguna baru di database
  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

// Fungsi untuk login pengguna
const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request); // Validasi data login

  // Mencari pengguna berdasarkan username
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  // Jika pengguna tidak ditemukan, lempar kesalahan
  if (!user) {
    throw new ResponseError(401, "Username or password wrong!");
  }

  // Memeriksa apakah password yang dimasukkan cocok
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong!");
  }

  // Membuat token unik untuk sesi pengguna
  const token = uuid().toString();
  // Memperbarui pengguna dengan token baru
  return await prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

// Fungsi untuk mendapatkan detail pengguna
const get = async (username) => {
  username = validate(getUserValidation, username); // Validasi username

  // Mencari pengguna berdasarkan username
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  // Jika pengguna tidak ditemukan, lempar kesalahan
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return user; // Mengembalikan detail pengguna
};

// Fungsi untuk memperbarui informasi pengguna
const update = async (request) => {
  const user = validate(updateUserValidation, request); // Validasi data pengguna

  // Menghitung jumlah pengguna yang cocok di database
  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // Jika tidak ada pengguna yang ditemukan, lempar kesalahan
  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User not found");
  }

  const data = {};

  // Menambahkan data yang akan diperbarui
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10); // Hash password baru
  }

  // Memperbarui pengguna dengan data baru
  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

// Fungsi untuk logout pengguna
const logout = async (username) => {
  username = validate(getUserValidation, username); // Validasi username
  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  // Jika pengguna tidak ditemukan, lempar kesalahan
  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  // Menghapus token untuk logout
  return await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: null, // Mengatur token ke null
    },
    select: {
      username: true,
    },
  });
};

// Mengekspor fungsi untuk digunakan di modul lain
export default {
  register,
  login,
  get,
  update,
  logout,
};
