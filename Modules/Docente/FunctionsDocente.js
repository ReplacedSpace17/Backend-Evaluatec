const connection = require('../../config/SQL_Connector');

//function to get Info of the professor
// Function to get Info of the professor
function get_info_professor(req, res, id_docente) {
    // SQL queries to get professor info and scores
    const professorQuery = `
        SELECT
            d.ID AS Docente_ID,
            d.Nombre,
            d.ApPaterno,
            d.ApMaterno,
            d.GradoEstudio,
            d.Foto,
            d.Email,
            dep.Nombre AS Departamento_Nombre
        FROM Docente d
        JOIN Pertenecen p ON d.ID = p.ID_DOCENTE
        JOIN Departamento dep ON p.ID_DEPARTAMENTO = dep.ID
        WHERE d.ID = ?;
    `;

    const scoresQuery = `
        SELECT
            p.ID AS Puntaje_ID,
            p.Calificacion,
            p.Opinion,
            p.Fecha,
            p.ID_MATERIA AS Materia_ID,
            m.Nombre AS Materia_Nombre,
            dep.Nombre AS Departamento_Nombre
        FROM Puntaje p
        JOIN Materias m ON p.ID_MATERIA = m.ID
        JOIN Departamento dep ON m.id_departamento = dep.ID
        WHERE p.ID_DOCENTE = ?;
    `;

    // Execute the query to get professor information
    connection.query(professorQuery, [id_docente], (err, professorResults) => {
        if (err) {
            console.error('Error executing professor query:', err);
            return res.status(500).send('Error executing query');
        }

        // If no professor found
        if (professorResults.length === 0) {
            return res.status(404).send('Professor not found');
        }

        // Extract professor info
        const professorInfo = professorResults[0];

        // Execute the query to get professor scores
        connection.query(scoresQuery, [id_docente], (err, scoresResults) => {
            if (err) {
                console.error('Error executing scores query:', err);
                return res.status(500).send('Error executing query');
            }

            // Build the response object
            const response = {
                ID: professorInfo.Docente_ID,
                Nombre: professorInfo.Nombre,
                ApPaterno: professorInfo.ApPaterno,
                ApMaterno: professorInfo.ApMaterno,
                Email: professorInfo.Email,
                Foto: professorInfo.Foto,
                Departamento: professorInfo.Departamento_Nombre,
                GradoEstudios: professorInfo.GradoEstudio,
                scores: scoresResults.map(score => ({
                    Puntaje_ID: score.Puntaje_ID,
                    Calificacion: score.Calificacion,
                    Opinion: score.Opinion,
                    Fecha: score.Fecha,
                    Materia_ID: score.Materia_ID,
                    Materia_Nombre: score.Materia_Nombre,
                    Departamento_Nombre: score.Departamento_Nombre
                }))
            };

            // Send the response
            res.send(response);
        });
    });
}


module.exports = {
    get_info_professor 
}
