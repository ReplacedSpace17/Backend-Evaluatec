const connection = require('../../config/SQL_Connector');

//Function to get all prfofessors
function get_all_professors(req, res) {
    const query = 'SELECT * FROM Docente';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }
        res.send(results);
    });
}


// Function to get last 5 professors evaluated
function get_last_professors_evaluated(req, res) {
    const query = `
        SELECT DISTINCT d.ID, d.Nombre, d.ApPaterno, d.ApMaterno, d.Email, d.Foto, dep.Nombre AS Departamento
        FROM Puntaje p
        JOIN Docente d ON p.ID_DOCENTE = d.ID
        JOIN Pertenecen pe ON d.ID = pe.ID_DOCENTE
        JOIN Departamento dep ON pe.ID_DEPARTAMENTO = dep.ID
        ORDER BY p.Fecha DESC, p.ID DESC
        LIMIT 5;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }
        res.send(results);
    });
}

//fuction to get the last 30 scores the user has made
function get_last_scores(req, res) {
    const query = `
        SELECT
            p.ID AS Puntaje_ID,
            p.Calificacion,
            p.Opinion,
            p.Fecha,
            d.ID AS Docente_ID,
            CONCAT(d.Nombre, ' ', d.ApPaterno, ' ', d.ApMaterno) AS Docente_Nombre,
            m.ID AS Materia_ID,
            m.Nombre AS Materia_Nombre,
            dep.Nombre AS Departamento_Nombre
        FROM Puntaje p
        JOIN Docente d ON p.ID_DOCENTE = d.ID
        JOIN Materias m ON p.ID_MATERIA = m.ID
        JOIN Departamento dep ON m.id_departamento = dep.ID
        ORDER BY p.Fecha DESC, p.ID DESC
        LIMIT 30;
    `;

    connection.query(query, [req.session.user.ID], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }
        res.send(results);
    });
}

module.exports = {
    get_all_professors, get_last_professors_evaluated, get_last_scores
};
