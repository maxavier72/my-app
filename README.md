# Weather Dashboard ☀️🌧️

Dashboard cuaca interaktif menggunakan OpenWeatherMap API untuk menampilkan informasi cuaca terkini dan prakiraan 5 hari ke depan.

## 📋 Deskripsi

Weather Dashboard adalah aplikasi web yang menampilkan informasi cuaca secara real-time dengan fitur pencarian kota dan history pencarian yang disimpan di localStorage.

## ✨ Fitur Utama

1. **Form Input dengan Autocomplete** - Pencarian kota dengan suggestions otomatis
2. **Display Cuaca Saat Ini** - Menampilkan cuaca dengan icon, temperature, humidity, dan wind speed
3. **Tabel Forecast 5 Hari** - Prakiraan cuaca untuk 5 hari ke depan
4. **History Pencarian Kota** - Riwayat pencarian disimpan di localStorage
5. **Toggle Unit Celsius/Fahrenheit** - Konversi unit suhu

## 🛠️ Teknologi yang Digunakan

- **Framework**: ReactJS (Create React App)
- **Styling**: CSS murni dengan design modern
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Axios
- **API**: OpenWeatherMap API
- **Storage**: localStorage

## 📁 Struktur Folder

```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchForm.jsx
│   │   ├── SearchForm.css
│   │   ├── DataTable.jsx
│   │   ├── DataTable.css
│   │   └── DetailCard.jsx
│   │   └── DetailCard.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Cara Instalasi

1. Clone atau download project ini
2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm start
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## 🔑 API Configuration

API Key sudah dikonfigurasi di file `src/App.jsx`:
```javascript
const API_KEY = 'c3ba696511fe6829f62f6aa8fa5b330e';
```

**Note**: API ini memiliki limit 60 calls per menit untuk versi gratis.

## 📱 Fitur Responsif

- Desktop view: Tabel lengkap dengan semua informasi
- Mobile view: Card view yang lebih mudah dibaca di layar kecil

## 🎨 Fitur Desain

- Gradient background modern
- Card dengan shadow dan hover effects
- Animated loading spinner
- Smooth transitions
- Weather icons dari OpenWeatherMap
- Emoji icons untuk detail cuaca

## 📊 Data yang Ditampilkan

### Cuaca Saat Ini:
- Nama kota dan negara
- Tanggal dan waktu
- Temperature dan feels like
- Deskripsi cuaca dengan icon
- Kelembaban
- Kecepatan angin
- Tekanan udara
- Jarak pandang
- Persentase awan
- Waktu matahari terbit

### Prakiraan 5 Hari:
- Tanggal
- Icon cuaca
- Temperature
- Deskripsi
- Kelembaban
- Kecepatan angin

## 💾 Local Storage

History pencarian disimpan dengan key: `searchHistory`
- Maksimal 10 history terakhir
- Menghindari duplikasi
- Dapat diklik untuk search ulang

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 Catatan Pengembangan

- Gunakan `npm start` untuk development
- Gunakan `npm run build` untuk production build
- API key sudah include, tetapi sebaiknya gunakan API key sendiri untuk production

## 👨‍💻 Developer

Project ini dibuat untuk memenuhi tugas Digit 1 - Weather Dashboard

## 📄 License

MIT License - Free to use and modify

---

**Happy Coding! ☀️🌈**
