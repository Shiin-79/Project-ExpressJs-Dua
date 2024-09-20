// Mendefinisikan kelas ResponseError yang mewarisi dari kelas Error
class ResponseError extends Error {
  // Konstruktor untuk inisialisasi objek ResponseError
  constructor(status, message) {
    super(message); // Memanggil konstruktor kelas Error dengan pesan
    this.status = status; // Menyimpan status HTTP di properti status
  }
}

// Mengekspor kelas ResponseError agar dapat digunakan di modul lain
export { ResponseError };
