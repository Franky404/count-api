const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// File untuk menyimpan jumlah pengunjung
const countFilePath = path.join(__dirname, 'count.json');

// Inisialisasi jumlah pengunjung
if (!fs.existsSync(countFilePath)) {
    fs.writeFileSync(countFilePath, JSON.stringify({ visits: 0 }));
}

// Middleware untuk menghitung pengunjung
app.use((req, res, next) => {
    const countData = JSON.parse(fs.readFileSync(countFilePath));
    countData.visits += 1;
    fs.writeFileSync(countFilePath, JSON.stringify(countData));
    next();
});

// Endpoint untuk mendapatkan jumlah pengunjung
app.get('/visitor-count', (req, res) => {
    const countData = JSON.parse(fs.readFileSync(countFilePath));
    res.json({ totalVisitors: countData.visits });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
