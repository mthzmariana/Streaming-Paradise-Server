const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Crear un nuevo mensaje de contacto
router.post("/", async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body;

    const newContact = await Contact.create({
      nombre,
      correo,
      mensaje,
    });

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los mensajes de contacto
router.get("/contacto", async (req, res) => {
  try {
    // Obtener todos los registros de contacto
    const contacts = await Contact.findAll(); // Esto obtiene todos los contactos

    res.status(200).json(contacts); // Devuelve los contactos encontrados
  } catch (error) {
    res.status(500).json({ error: error.message }); // En caso de error, devuelve el mensaje de error
  }
});


module.exports = router;
