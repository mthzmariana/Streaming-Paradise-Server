const express = require('express');
const { Rating } = require('../models'); // Asegúrate de que el modelo Rating esté importado correctamente
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { score, iduser, idvideo } = req.body;

    // Crear o actualizar el puntaje
    const newRating = await Rating.create({ score, iduser, idvideo });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// Obtener la calificación promedio de un video específico
router.get('/video/:idvideo', async (req, res) => {
  try {
    const { idvideo } = req.params;
    const ratings = await Rating.findAll({ where: { idvideo } });
    const avgScore = ratings.reduce((acc, rating) => acc + rating.score, 0) / ratings.length || 0;
    res.json({ averageRating: avgScore });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una calificación
router.delete('/:ratingId', async (req, res) => {
  try {
    const { ratingId } = req.params;
    const result = await Rating.destroy({ where: { id: ratingId } });
    if (result) {
      res.json({ message: 'Calificación eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Calificación no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
