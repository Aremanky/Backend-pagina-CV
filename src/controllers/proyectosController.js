const pool = require('../config/db');

// 1. GET
exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM proyectos ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. GET BY ID 
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM proyectos WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. POST 
exports.create = async (req, res) => {
    try {
        const { titulo, fecha, descripcion, tags } = req.body; 
        // Nota: 'tags' en Postgres se puede pasar como un array de JS si la columna es TEXT[]
        const query = 'INSERT INTO proyectos (titulo, fecha, descripcion, tags) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [titulo, fecha, descripcion, tags];
        
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. PUT 
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, fecha, descripcion, tags } = req.body;
        const query = 'UPDATE proyectos SET titulo = $1, fecha = $2, descripcion = $3, tags = $4 WHERE id = $5 RETURNING *';
        const values = [titulo, fecha, descripcion, tags, id];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. DELETE 
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM proyectos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado con éxito', proyecto: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};