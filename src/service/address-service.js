// Mengimpor prismaClient untuk berinteraksi dengan database
import { prismaClient } from "../application/database.js";
// Mengimpor fungsi validasi
import { validate } from "../validation/validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";

// Fungsi untuk memeriksa apakah kontak ada
const checkContactMustExist = async (user, contactId) => {
  // Validasi contactId
  contactId = validate(getContactValidation, contactId);

  // Menghitung jumlah kontak dalam database yang sesuai
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      id: contactId,
      username: user.username,
    },
  });

  // Jika tidak ada kontak yang ditemukan, lempar kesalahan
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact not found");
  }

  return contactId; // Mengembalikan contactId yang valid
};

// Fungsi untuk membuat alamat baru
const create = async (user, contactId, request) => {
  contactId = await checkContactMustExist(user, contactId); // Memastikan kontak ada
  const address = validate(createAddressValidation, request); // Validasi data alamat
  address.contact_id = contactId; // Menambahkan ID kontak ke data alamat

  return prismaClient.address.create({
    data: address, // Menyimpan data alamat
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

// Fungsi untuk mendapatkan alamat berdasarkan ID
const get = async (user, contactId, addressId) => {
  contactId = await checkContactMustExist(user, contactId); // Memastikan kontak ada
  addressId = validate(getAddressValidation, addressId); // Validasi addressId

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  // Jika alamat tidak ditemukan, lempar kesalahan
  if (!address) {
    throw new ResponseError(404, "address is not found");
  }

  return address; // Mengembalikan data alamat
};

// Fungsi untuk memperbarui alamat
const update = async (user, contactId, request) => {
  contactId = await checkContactMustExist(user, contactId); // Memastikan kontak ada
  const address = validate(updateAddressValidation, request); // Validasi data alamat

  // Menghitung jumlah alamat yang sesuai dalam database
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  // Jika alamat tidak ditemukan, lempar kesalahan
  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "address is not found");
  }

  return prismaClient.address.update({
    where: {
      id: address.id, // ID alamat yang akan diperbarui
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

// Fungsi untuk menghapus alamat
const remove = async (user, contactId, addressId) => {
  contactId = await checkContactMustExist(user, contactId); // Memastikan kontak ada
  addressId = validate(getAddressValidation, addressId); // Validasi addressId

  // Menghitung jumlah alamat yang sesuai dalam database
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  // Jika alamat tidak ditemukan, lempar kesalahan
  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "address is not found");
  }

  // Menghapus alamat berdasarkan ID
  await prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

// Fungsi untuk mendapatkan daftar alamat berdasarkan kontak
const list = async (user, contactId) => {
  contactId = await checkContactMustExist(user, contactId); // Memastikan kontak ada
  return prismaClient.address.findMany({
    where: {
      contact_id: contactId, // Mendapatkan alamat untuk kontak tertentu
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

// Mengekspor fungsi-fungsi untuk digunakan di modul lain
export default {
  create,
  get,
  update,
  remove,
  list,
};
