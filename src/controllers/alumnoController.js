const Alumno = require('../models/alumno');

// Controlador para obtener todos los alumnos
exports.getAllAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.findAll();
        res.status(200).json({
            ok: true,
            data: alumnos,
            msg: "Estos son los alumnos"
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los alumnos' });
    }
};

// Controlador para buscar un alumno por ID
exports.getAlumnoById = async (req, res) => {
    const { id } = req.query;

    try {
        const alumno = await Alumno.findByPk(id);

        if (alumno) {
            res.status(200).json({
                ok: true,
                data: alumno
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "No encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el alumno' });
    }
};

// Controlador para crear un nuevo alumno
exports.createAlumno = async (req, res) => {
    const { apellido, nombre, dni, activo, fechaNacimiento, email } = req.body;

    // Validar datos de entrada
    if (!apellido || !nombre || !dni || !fechaNacimiento || !email) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        // Crear nuevo alumno
        const nuevoAlumno = await Alumno.create({
            apellido,
            nombre,
            dni,
            activo,
            fechaNacimiento,
            email
        });

        // Responder con el alumno creado
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El DNI o el email ya están en uso' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al crear el alumno' });
    }
};

// Controlador para actualizar un alumno
exports.updateAlumno = async (req, res) => {
    const { id } = req.query;
    const { apellido, nombre, dni, activo, fechaNacimiento, email } = req.body;

    try {
        const alumno = await Alumno.findByPk(id);

        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        alumno.apellido = apellido || alumno.apellido;
        alumno.nombre = nombre || alumno.nombre;
        alumno.dni = dni || alumno.dni;
        alumno.activo = activo !== undefined ? activo : alumno.activo;
        alumno.fechaNacimiento = fechaNacimiento || alumno.fechaNacimiento;
        alumno.email = email || alumno.email;

        await alumno.save();
        res.status(200).json(alumno);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'El DNI o el email ya están en uso' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el alumno' });
    }
};

// Controlador para eliminar un alumno
exports.deleteAlumno = async (req, res) => {
    const { id } = req.query;

    try {
        const alumno = await Alumno.findByPk(id);

        if (!alumno) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        await alumno.destroy();
        res.status(200).json({ message: 'Alumno eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el alumno' });
    }
};
