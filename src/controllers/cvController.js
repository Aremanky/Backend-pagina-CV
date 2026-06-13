const pool = require('../config/db');

exports.getEntireCV = async (req, res) => {
    try {
        const [
            academico,
            competencias,
            experiencia,
            extras,
            habilidades,
            idiomas,
            proyectos
        ] = await Promise.all([
            pool.query('SELECT * FROM academico ORDER BY id DESC'),
            pool.query('SELECT * FROM competencies_tecnicas ORDER BY id ASC'),
            pool.query('SELECT * FROM experiencia ORDER BY id DESC'),
            pool.query('SELECT * FROM extras ORDER BY id DESC'),
            pool.query('SELECT * FROM habilidades ORDER BY id ASC'),
            pool.query('SELECT * FROM idiomas ORDER BY id ASC'),
            pool.query('SELECT * FROM proyectos ORDER BY id DESC')
        ]);

        res.json({
            academico: academico.rows,
            competencias_tecnicas: competencias.rows,
            experiencia: experiencia.rows,
            extras: extras.rows,
            habilidades: habilidades.rows,
            idiomas: idiomas.rows,
            proyectos: proyectos.rows
        });
    } catch (error) {
        console.error('Error en el agregador de CV:', error);
        res.status(500).json({ error: 'Internal Server Error al compilar el CV' });
    }
};