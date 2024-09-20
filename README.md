# Project-ExpressJs-Dua

## Prasyarat
Sebelum memulai, pastikan kamu telah menginstal hal-hal berikut di sistem kamu:

- Git
- Node.js (versi X.X.X atau lebih baru)
- yarn
- Opsional: Docker jika menggunakan container

## Clone Repository
Clone repository ini ke dalam direktori lokal kamu menggunakan perintah git:

```bash
git clone https://github.com/Shiin-79/Project-ExpressJs-Dua.git
```

## Masuk ke Direktori Proyek
Setelah cloning selesai, masuk ke dalam direktori proyek:

```bash
cd Project-ExpressJs-Dua
```

## Install Dependencies
Install dependencies dengan menggunakan perintah yarn:

```bash
yarn install
``` 
## Atur Variabel Lingkungan
Di proyek ini memerlukan file .env untuk konfigurasi environment, buat file .env di root directory proyek dan tambahkan variabel lingkungan yang diperlukan seperti contoh di bawah ini:

```bash
DATABASE_URL="mysql://root:PasswordMysql@url:port/namadatabase"
```
ubah variabel lingkungan sesuai kebutuhanmu (PasswordMysql, url:port dan namadatabase)


## Setup Database
Migrate database dengan menggunakan perintah:

```bash
npx prisma migrate dev
```

## Run Server
Mulai server dengan menggunakan perintah yarn start:

```bash
yarn start
``` 

## Lisensi
Project ini dilisensikan di bawah [MIT License](./LICENSE).