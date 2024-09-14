const { compare_password } = require('../../tools/bycrypt'); 
const connection = require('../../config/SQL_Connector'); 

// Función para validar al usuario
function login_user(req, res, email, password) {
    // Consulta SQL para obtener la contraseña del usuario
    const query = 'SELECT Password FROM Alumno WHERE Email = ?';

    connection.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error en la base de datos');
        }
        if (results.length === 0) {
            // Usuario no encontrado
            return res.status(400).send('Este usuario no existe');
        }
        // Obtener la contraseña almacenada
        const hashedPasswordDB = results[0].Password;
        // Comparar la contraseña ingresada con la almacenada
        compare_password(password, hashedPasswordDB, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error al comparar contraseñas');
            }
            if (isMatch) {
                // Contraseñas coinciden
                //crear una sesion
                req.session.user = { email }; // Guardar información del usuario en la sesión
                console.log('✅ Sesion creada para: ', email);
                return res.status(200).send('Usuario logueado');
            } else {
                // Contraseñas no coinciden
                return res.status(400).send('La contraseña no coincide');
            }
        });
    });
}



// Exportar las funciones
module.exports = {
    login_user
};
