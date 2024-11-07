// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Obtener todos los cupones
router.get('/cupones', async (req, res) => {
    const cupones = await Coupon.findAll();
    res.json(cupones);
});
// Obtener un cupón por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la URL
    try {
        const cupon = await Coupon.findByPk(id); // Usamos findByPk para buscar por clave primaria (ID)
        if (cupon) {
            res.json(cupon); // Si el cupón existe, lo retornamos en la respuesta
        } else {
            res.status(404).json({ message: "Cupón no encontrado" }); // Si no se encuentra, devolvemos un error 404
        }
    } catch (error) {
        res.status(500).json({ message: error.message }); // En caso de error, devolvemos un mensaje con el error
    }
});


// Crear un nuevo cupón
router.post('/create', async (req, res) => {
    const { porcentaje, codigo, fecha_expiracion, usos_maximos, usos_actuales } = req.body;
    try {
        const newCoupon = await Coupon.create({
            porcentaje,
            codigo,
            fecha_expiracion,
            usos_maximos,
            usos_actuales: usos_actuales || 0 // Si no se envía, se establece en 0
        });
        res.json(newCoupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Actualizar un cupón por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCoupon = await Coupon.update(req.body, { where: { idcupon: id } });
    res.json(updatedCoupon);
});

// Eliminar un cupón
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Coupon.destroy({ where: { idcupon: id } });
    res.json({ message: 'Cupón eliminado' });
});

module.exports = router;
