const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User'); // Asegúrate de importar el modelo User para actualizar el rol del usuario

// Ruta para recibir los datos de la compra y guardarlos
router.post('/capture', async (req, res) => {
  try {
    const { email_address, name, transaction_id, status, amount, currency, payer_id, userId, new_role } = req.body;

    // Crear un nuevo registro en la base de datos
    const newPayment = await Payment.create({
      name,             // Comprador
      email_address,     // Email
      transaction_id,    // ID de la transacción
      status,            // Estado
      amount,            // Monto
      currency,          // Moneda (USD)
      payer_id           // ID del pagador
    });

    // Verificar si la transacción fue completada
    if (status === 'COMPLETED') {
      // Actualizar el rol del usuario en la base de datos
      await User.update({ idrol: new_role }, { where: { id: userId } });
      console.log(`Rol del usuario con ID ${userId} actualizado a ${new_role}`);
    }

    res.status(201).json({ message: 'Pago guardado exitosamente y rol actualizado si fue completado', payment: newPayment });
  } catch (error) {
    console.error('Error al guardar el pago o actualizar el rol:', error);
    res.status(500).json({ message: 'Error al guardar el pago o actualizar el rol' });
  }
});

module.exports = router;
