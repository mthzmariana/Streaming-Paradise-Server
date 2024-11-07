const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

// Asignar un permiso a un rol
router.post('/assign', async (req, res) => {
    try {
        const { idrol, idpermiso } = req.body;
        const newAssignment = await RolePermission.create({ idrol, idpermiso });
        res.status(201).json(newAssignment);
    } catch (error) {
        console.error('Error al asignar permiso al rol:', error);
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un permiso de un rol
router.delete('/eliminar-rolxpermiso', async (req, res) => {
    try {
        const { idrol, idpermiso } = req.body;
        await RolePermission.destroy({ where: { idrol, idpermiso } });
        res.status(200).json({ message: 'Permiso eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar permiso del rol:', error);
        res.status(500).json({ error: error.message });
    }
});


    // Obtener roles con permisos
    router.get('/roles-with-permissions', async (req, res) => {
        try {
            const roles = await Role.getRolesWithPermissions();
            res.json(roles);
        } catch (error) {
            console.error('Error al obtener roles con permisos:', error);
            res.status(500).json({ error: error.message });
        }
    });

// Obtener rol con permisos por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el id del rol desde los parámetros de la solicitud
    try {
        const rolConPermisos = await Role.getRoleWithPermissionsById(id); // Función que busca el rol y sus permisos
        if (!rolConPermisos) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.json(rolConPermisos);
    } catch (error) {
        console.error('Error al obtener el rol con permisos:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/rolxpermiso/:idrol', async (req, res) => {
    const { idrol } = req.params;

    try {
        // Verificar si el campo en la base de datos es correcto
        const permisos = await Role.findOne({
            where: { idrol }, // Asegúrate de que 'idrol' sea el nombre correcto del campo en tu base de datos
            include: [{
                model: Permission,
                as: 'permissions', // Asegúrate de que el alias coincida con el definido en el modelo
                through: { attributes: [] }, // No mostrar atributos de la tabla intermedia
            }],
        });

        if (!permisos) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        // Extraer permisos de la respuesta y asignar nombres correctos
        const permisosList = permisos.permissions.map(permiso => ({
            idpermiso: permiso.idpermiso, // Asegúrate de que este campo existe en el modelo
            nompermiso: permiso.nompermiso, // Cambié a nompermiso para coincidir con tu frontend
        }));

        res.json(permisosList.length > 0 ? permisosList : { message: 'No se encontraron permisos asociados a este rol.' });
    } catch (error) {
        console.error('Error al obtener permisos por rol:', error);
        res.status(500).json({ error: error.message });
    }
});


  



module.exports = router;
