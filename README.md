# ☕ Kopi Backend

Backend API untuk aplikasi Coffee Shop berbasis **NestJS** + **Prisma** + **MySQL**.

## Fitur

- **Autentikasi** — Register & Login dengan JWT
- **Menu Kopi** — CRUD menu kopi (espresso, manual brew, non-coffee, dll)
- **Pesanan** — Customer order kopi, tracking status pesanan
- **Transaksi** — Pembayaran & upload bukti transfer

## Teknologi

- **NestJS** — Framework backend TypeScript
- **Prisma ORM** — Database ORM
- **MySQL** — Database
- **JWT** — Autentikasi
- **Cloudinary** — Upload gambar / bukti transfer

---

## Endpoint

### Auth
| Method | Endpoint          | Deskripsi            |
|--------|-------------------|----------------------|
| POST   | /auth/register    | Daftar akun baru     |
| POST   | /auth/login       | Login                |
| GET    | /auth/me          | Info user login      |

### Menu
| Method | Endpoint          | Deskripsi                        |
|--------|-------------------|----------------------------------|
| GET    | /menu             | Ambil semua menu (filter by ?kategori=) |
| GET    | /menu/:id         | Detail menu                      |
| POST   | /menu             | Tambah menu (Admin)              |
| PATCH  | /menu/:id         | Update menu (Admin)              |
| DELETE | /menu/:id         | Hapus menu (Admin)               |

### Pesanan
| Method | Endpoint            | Deskripsi                    |
|--------|---------------------|------------------------------|
| POST   | /pesanan            | Buat pesanan baru (Customer) |
| GET    | /pesanan            | Semua pesanan (Admin)        |
| GET    | /pesanan/my         | Pesanan saya (Customer)      |
| GET    | /pesanan/:id        | Detail pesanan               |
| PATCH  | /pesanan/:id/status | Update status (Admin)        |

### Transaksi
| Method | Endpoint                          | Deskripsi                  |
|--------|-----------------------------------|----------------------------|
| POST   | /transaksi                        | Buat transaksi             |
| POST   | /transaksi/upload-bukti/:pesananId| Upload bukti transfer      |
| GET    | /transaksi                        | Semua transaksi (Admin)    |
| GET    | /transaksi/:id                    | Detail transaksi           |
| PATCH  | /transaksi/:id/status             | Update status (Admin)      |

### Users
| Method | Endpoint     | Deskripsi         |
|--------|--------------|-------------------|
| GET    | /users       | Semua user        |
| GET    | /users/:id   | Detail user       |
| PATCH  | /users/:id   | Update user       |
| DELETE | /users/:id   | Hapus user        |

---

## Kategori Menu

| Nilai         | Keterangan        |
|---------------|-------------------|
| `espresso`    | Espresso-based    |
| `manual_brew` | Manual Brew       |
| `non_coffee`  | Non Coffee        |
| `food`        | Makanan           |
| `minuman_lain`| Minuman Lainnya   |

## Status Pesanan / Order Flow

```
pending → waiting_payment → paid → on_process → ready → completed
                                               ↘ cancelled
```

---

## Setup

1. Copy `.env.example` → `.env`, isi `DATABASE_URL` dan `JWT_SECRET`
2. `npm install`
3. `npx prisma migrate dev`
4. `npm run start:dev`

---

## .env Contoh

```env
DATABASE_URL="mysql://root:password@localhost:3306/kopi_db"
JWT_SECRET="your-secret-key"
CLOUDINARY_NAME="your-cloud-name"
CLOUDINARY_KEY="your-api-key"
CLOUDINARY_SECRET="your-api-secret"
```
