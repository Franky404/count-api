const express = require('express');
const cors = require('cors');  // Tambahkan ini
const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;

// Gunakan CORS Middleware
app.use(cors());  // Ini akan mengizinkan semua origin (domain)

app.get('/visitor-count', (req, res) => {
    visitorCount++;
    res.json({ totalVisitors: visitorCount });
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Visitor Counter App</h1>
        <p>Total Visitors: <span id="count"></span></p>
        <script>
            async function fetchVisitorCount() {
                const response = await fetch('/visitor-count');
                const data = await response.json();
                document.getElementById('count').innerText = data.totalVisitors;
            }

            fetchVisitorCount();
        </script>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
