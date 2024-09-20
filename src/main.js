import { web } from "./application/web.js"; // Mengimpor instance web dari modul web
import { logger } from "./application/logging.js"; // Mengimpor logger untuk mencatat aktivitas

// Memulai server pada port 3000
web.listen(3000, () => {
  logger.info("Server running on port 3000"); // Mencatat informasi bahwa server telah berjalan
});
