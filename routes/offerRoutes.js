const express = require('express');
const router = express.Router();
const { Offer, Subscription } = require('../models');

// Obtener todas las ofertas
router.get('/ofertas', async (req, res) => {
    try {
        const offers = await Offer.findAll();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ofertas' });
    }
});

// Crear una nueva oferta
router.post('/create', async (req, res) => {
    const { descripcion, porcentaje, startDate, endDate, idsub } = req.body;
  
    try {
      // Valida que la suscripción exista antes de crear la oferta
      const subscription = await Subscription.findByPk(idsub);
      if (!subscription) {
        return res.status(404).json({ message: 'La suscripción no existe' });
      }
  
      const newOffer = await Offer.create({
        descripcion,
        porcentaje,
        startDate,
        endDate,
        idsub,
      });
  
      res.json(newOffer);
    } catch (error) {
      console.error('Error al crear la oferta:', error);
      res.status(500).json({ message: 'Error al crear la oferta' });
    }
});

// Obtener las ofertas con el nombre de la suscripción
router.get('/list', async (req, res) => {
    try {
        const offers = await Offer.findAll({
            include: {
                model: Subscription,
                attributes: ['name'],
            },
        });
        res.json(offers);
    } catch (error) {
        console.error('Error al obtener las ofertas:', error);
        res.status(500).json({ message: 'Error al obtener las ofertas' });
    }
});

// Actualizar una oferta por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOffer = await Offer.update(req.body, { where: { idoffer: id } });
        res.json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la oferta' });
    }
});

// Obtener una oferta por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const offer = await Offer.findOne({ where: { idoffer: id } });
      if (!offer) {
        return res.status(404).json({ message: 'Oferta no encontrada' });
      }
      res.json(offer);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la oferta' });
    }
  });
// Eliminar una oferta por su ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Offer.destroy({ where: { idoffer: id } });
        res.json({ message: 'Oferta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la oferta' });
    }
});

module.exports = router;
