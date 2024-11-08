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

module.exports = router;
