// Mengimpor PrismaClient dari pustaka Prisma dan logger dari file logging
import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

// Membuat instance PrismaClient dengan konfigurasi logging
export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event", // Emit log sebagai event
      level: "query", // Log query yang dikirim ke database
    },
    {
      emit: "event", // Emit log sebagai event
      level: "error", // Log kesalahan yang terjadi
    },
    {
      emit: "event", // Emit log sebagai event
      level: "info", // Log informasi umum
    },
    {
      emit: "event", // Emit log sebagai event
      level: "warn", // Log peringatan yang muncul
    },
  ],
});

// Menangani event kesalahan
prismaClient.$on("error", (e) => {
  logger.error(e); // Mencatat kesalahan menggunakan logger
});

// Menangani event peringatan
prismaClient.$on("warn", (e) => {
  logger.warn(e); // Mencatat peringatan menggunakan logger
});

// Menangani event informasi
prismaClient.$on("info", (e) => {
  logger.info(e); // Mencatat informasi menggunakan logger
});

// Menangani event query
prismaClient.$on("query", (e) => {
  logger.info(e); // Mencatat query yang dikirim ke database menggunakan logger
});
