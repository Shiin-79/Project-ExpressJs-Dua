import {
  searchContactValidation,
  createContactValidation,
  getContactValidation,
  updateContactValidation,
} from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

// Fungsi untuk membuat kontak baru
const create = async (user, request) => {
  const contact = validate(createContactValidation, request); // Validasi data kontak
  contact.username = user.username; // Mengaitkan kontak dengan username pengguna

  // Menyimpan kontak baru di database
  return await prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

// Fungsi untuk mendapatkan informasi kontak berdasarkan ID
const get = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId); // Validasi ID kontak
  const contact = await prismaClient.contact.findFirst({
    where: {
      id: contactId,
      username: user.username, // Pastikan kontak milik pengguna yang sedang login
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });

  // Jika kontak tidak ditemukan, lempar kesalahan
  if (!contact) {
    throw new ResponseError(404, "Contact not found");
  }
  return contact; // Mengembalikan informasi kontak
};

// Fungsi untuk memperbarui informasi kontak
const update = async (user, request) => {
  const contact = validate(updateContactValidation, request); // Validasi data kontak

  // Menghitung jumlah kontak yang cocok di database
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contact.id,
      username: user.username, // Pastikan kontak milik pengguna
    },
  });

  // Jika tidak ada kontak yang ditemukan, lempar kesalahan
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact not found");
  }

  // Memperbarui informasi kontak
  return prismaClient.contact.update({
    where: {
      id: contact.id,
    },
    data: {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
    },
  });
};

// Fungsi untuk menghapus kontak
const remove = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId); // Validasi ID kontak

  // Menghitung jumlah kontak yang cocok di database
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contactId,
      username: user.username, // Pastikan kontak milik pengguna
    },
  });

  // Jika tidak ada kontak yang ditemukan, lempar kesalahan
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact not found");
  }

  // Menghapus kontak dari database
  return prismaClient.contact.delete({
    where: {
      id: contactId,
    },
  });
};

// Fungsi untuk mencari kontak dengan paginasi
const search = async (user, request) => {
  request = validate(searchContactValidation, request); // Validasi data pencarian
  const skip = (request.page - 1) * request.size; // Menghitung offset untuk paginasi
  const filters = [];
  filters.push({
    username: user.username, // Pastikan pencarian untuk kontak milik pengguna
  });

  // Menambahkan filter berdasarkan nama, email, atau telepon jika ada
  if (request.name) {
    filters.push({
      OR: [
        {
          first_name: {
            contains: request.name,
          },
        },
        {
          last_name: {
            contains: request.name,
          },
        },
      ],
    });
  }
  if (request.email) {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }
  if (request.phone) {
    filters.push({
      phone: {
        contains: request.phone,
      },
    });
  }

  // Mencari kontak berdasarkan filter yang telah ditentukan
  const contacts = await prismaClient.contact.findMany({
    where: {
      AND: filters,
    },
    take: request.size, // Mengambil jumlah kontak sesuai dengan request.size
    skip: skip, // Menggunakan offset untuk paginasi
  });

  // Menghitung total kontak yang cocok dengan filter
  const totalitems = await prismaClient.contact.count({
    where: {
      AND: filters,
    },
  });

  // Mengembalikan daftar kontak dan informasi paginasi
  return {
    data: contacts,
    paging: {
      page: request.page,
      total_item: totalitems,
      total_page: Math.ceil(totalitems / request.size),
    },
  };
};

// Mengekspor semua fungsi untuk digunakan di modul lain
export default {
  create,
  get,
  update,
  remove,
  search,
};
