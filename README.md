# 🚀 NexaAI — Solusi AI untuk Konten UMKM

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

NexaAI adalah platform AI yang membantu pelaku UMKM membuat konten promosi secara otomatis, cepat, dan profesional — tanpa perlu kemampuan desain atau copywriting.

---

## 📚 Daftar Isi
- [✨ Fitur Utama](#-fitur-utama)
- [🛠 Tech Stack](#-tech-stack)
- [📦 Requirements](#-requirements)
- [🚀 Setup Project](#-setup-project)
- [🔑 Environment Variables](#-environment-variables)
- [📊 Database Schema](#-database-schema)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Fitur Utama

### 🧑‍💼 1. Autentikasi & Manajemen Pengguna
- Login & Register Email/Password  
- Login Google OAuth  
- Protected Routes dengan session Supabase  

### ✍️ 2. Caption Generator
- Membuat caption Instagram & Facebook otomatis
- Gaya bahasa dapat disesuaikan UMKM

### 💬 3. WA Copywriting
- Menulis pesan WA broadcast yang profesional dan persuasif  
- Cocok untuk promo, jualan harian, dan campaign

### 🖼 4. Poster Generator
- Generate poster promosi otomatis
- Menggunakan model text-to-image terbaru

---

## 🛠 Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- TailwindCSS 4
- Axios
- Zod (schema validator)
- React Hook Form

### Backend & Storage
- Supabase (PostgreSQL)
- Supabase Auth (Email + OAuth Google)
- Supabase Storage
- N8n Workflow Automation

### AI Models
- Gemini API — Caption, Copywriting, Hashtag
- HuggingFace — FLUX.1-schnell text-to-image

### Development Tools
- ESLint 9.x
- Turbopack
- npm/yarn/bun

---

## 📦 Requirements

### System
- Node.js >= 21.x  
- npm / yarn / bun (latest)

### Accounts Needed
- Supabase Project  
- HuggingFace Token  
- Google Cloud OAuth  

---

## 🚀 Setup Project

### 1. Clone Repository
```bash
git clone https://github.com/AdnanRohmatKurniansah/imphen-hackathon.git
cd imphen-hackathon
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
# atau
bun install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root directory:
```bash
cp .env.example .env.local
```
Isi varibel berikut:
```bash
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
NEXT_PUBLIC_SUPABASE_DB=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_SUPABASE_STORAGE_URL=""
NEXT_PUBLIC_CHAT_N8N_URL=""
NEXT_PUBLIC_POSTER_N8N_URL=""
```

## 🔑 Environment Variables

Tambahkan variabel berikut ke `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

NEXT_PUBLIC_SUPABASE_DB=""
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=""
NEXT_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=""
NEXT_PUBLIC_SUPABASE_STORAGE_URL=""

NEXT_PUBLIC_CHAT_N8N_URL=""
NEXT_PUBLIC_POSTER_N8N_URL=""

GEMINI_API_KEY=""
HUGGINGFACE_TOKEN=""
```

## 📊 Database Schema

Jalankan perintah SQL berikut:

### 1. UMKM Categories
```sql
create table if not exists public.umkm_categories (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 2. UMKM Profiles
```sql
create table if not exists public.umkm_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category_id uuid,
  business_name varchar(150) not null,
  description varchar(255) not null,
  location varchar(100) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique(user_id),

  constraint fk_umkm_user
    foreign key (user_id) references auth.users(id)
    on delete cascade,

  constraint fk_umkm_category
    foreign key (category_id) references public.umkm_categories(id)
    on delete set null
);
```

### 3. Enum: Jenis Konten yang Dihasilkan AI
```sql
create type generate_type_enum as enum (
  'caption_ig',
  'copywriting_wa',
  'hashtag_rekomendasi'
);
```

### 4. N8N Chat Histories
```sql
create table if not exists public.n8n_chat_histories (
  id bigserial primary key,
  session_id text not null,
  message jsonb not null,
  inserted_at timestamp with time zone
    default timezone('utc'::text, now()) not null
);
```

### 5. Poster Generations
```sql
create table if not exists public.poster_generations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null,
  product_id uuid not null,
  headline text not null,
  subheadline text not null,
  cta text not null,
  theme text not null,
  image_url text not null,
  created_at timestamp default now(),
  updated_at timestamptz default now(),

  foreign key (profile_id)
    references umkm_profiles(id)
    on delete cascade,

  foreign key (product_id)
    references umkm_products(id)
    on delete cascade
);
```

## 🤝 Contributing

```
1. Fork repository
2. Buat branch baru: git checkout -b fitur-baru
3. Commit: git commit -m "Menambahkan fitur baru"
4. Push: git push origin fitur-baru
5. Buat Pull Request
```

## 📄 License

```
MIT License © 2025 NexaAI
```
