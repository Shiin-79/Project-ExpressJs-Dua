// Mengimpor pustaka winston untuk logging
import winston from "winston";

// Membuat instance logger menggunakan winston
export const logger = winston.createLogger({
  level: "info", // Menetapkan level log minimum yang akan dicatat (info dan di atasnya)
  format: winston.format.json(), // Mengatur format log menjadi JSON
  transports: [
    // Mengatur transportasi untuk mencetak log ke konsol
    new winston.transports.Console({}),
  ],
});
