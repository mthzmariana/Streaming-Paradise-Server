const express = require('express');
const router = express.Router();
const Role = require('../models/Role'); // Importa el modelo Role

// Crear un nuevo rol
router.post('/create', async (req, res) => {
  try {
    const { nomrol } = req.body; // Extraer el nombre del rol del cuerpo de la solicitud

    // Verificar si el nombre del rol ya existe
    const existingRole = await Role.findOne({ where: { nomrol } });
    if (existingRole) {
      return res.status(400).json({ message: 'El rol ya existe' });
    }

    // Crear el nuevo rol
    const newRole = await Role.create({
      nomrol
    });

    res.status(201).json(newRole); // Responder con el rol recién creado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los usuarios (No protegida)
router.get('/roles', async (req, res) => {
  try {
    const rol = await Role.findAll();
    res.json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Método GET para obtener un rol por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extraer el ID del rol de los parámetros

    // Buscar el rol por ID
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.status(200).json(role); // Responder con el rol encontrado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Método PUT para editar un rol existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extraer el ID del rol de los parámetros
    const { nomrol } = req.body; // Extraer el nuevo nombre del rol del cuerpo de la solicitud

    // Buscar el rol por ID
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    // Actualizar el nombre del rol
    role.nomrol = nomrol;
    await role.save(); // Guardar los cambios

    res.status(200).json(role); // Responder con el rol actualizado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Método DELETE para eliminar un rol existente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extraer el ID del rol de los parámetros

    // Buscar el rol por ID
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    // Eliminar el rol
    await role.destroy(); // Esto elimina el rol de la base de datos

    res.status(200).json({ message: 'Rol eliminado exitosamente' }); // Responder con un mensaje de éxito
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
