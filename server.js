const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const chartsRoutes = require('./routes/chartsRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const couponRoutes = require('./routes/couponRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const offerRoutes = require('./routes/offerRoutes');
const roleRoutes = require('./routes/roleRoutes'); // Importar rutas de roles
const permissionRoutes = require('./routes/permissionRoutes'); // Importar rutas de permisos
const rolePermissionRoutes = require('./routes/rolePermissionRoutes'); // Importar rutas de Role-Permiso
const contactRoutes = require('./routes/contact'); // Importar rutas de contacto
const paymentRoutes = require('./routes/paymentRoutes'); // Importa la ruta de pagos

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS para aceptar solicitudes desde cualquier origen
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/ratings', ratingRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/coupons', couponRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/offers', offerRoutes);
app.use('/roles', roleRoutes); // Usa las rutas de roles
app.use('/permissions', permissionRoutes); // Usa las rutas de permisos
app.use('/role-permission', rolePermissionRoutes); // Usa las rutas de Role-Permiso
app.use('/api/contact', contactRoutes); // Usa las rutas de contacto
app.use('/payments', paymentRoutes); // Usa la ruta de pagos
app.use(contactRoutes)

// Graficas Yaneli
app.use(chartsRoutes)


// Verifica la conexión con la base de datos y arranca el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión con la base de datos establecida.');
    return sequelize.sync({ force: false }); // Sincroniza los modelos sin borrar los datos
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar con la base de datos:', err));
