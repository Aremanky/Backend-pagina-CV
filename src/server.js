const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cvRoutes = require('./routes/cvRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', cvRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada en la API' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});