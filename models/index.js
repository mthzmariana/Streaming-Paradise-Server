// const User = require('./User');
// const Video = require('./Video');
// const Comment = require('./Comment');
// const Rating = require('./Rating');
// const Purchase = require('./Purchase'); // Importar Purchase
// const Subscription = require('./Subscription');
// const Offer = require('./Offer');

// // Relaciones existentes
// User.hasMany(Video, { foreignKey: 'creatorId' });
// Video.belongsTo(User, { foreignKey: 'creatorId' });

// // Corregir claves foráneas en Comment para que usen iduser e idvideo
// User.hasMany(Comment, { foreignKey: 'iduser' });
// Comment.belongsTo(User, { foreignKey: 'iduser' });

// Video.hasMany(Comment, { foreignKey: 'idvideo' });
// Comment.belongsTo(Video, { foreignKey: 'idvideo' });

// // Corregir claves foráneas en Rating para que usen iduser e idvideo
// User.hasMany(Rating, { foreignKey: 'iduser' });
// Rating.belongsTo(User, { foreignKey: 'iduser' });

// Video.hasMany(Rating, { foreignKey: 'idvideo' });
// Rating.belongsTo(Video, { foreignKey: 'idvideo' });

// // Relación entre Usuario y Suscripción
// User.hasOne(Subscription, { foreignKey: 'iduser' });
// Subscription.belongsTo(User, { foreignKey: 'iduser' });

// // NUEVAS RELACIONES: Purchase y Offer
// User.hasMany(Purchase, { foreignKey: 'iduser' });
// Purchase.belongsTo(User, { foreignKey: 'iduser' });

// Subscription.hasMany(Purchase, { foreignKey: 'idsub' });
// Purchase.belongsTo(Subscription, { foreignKey: 'idsub' });

// Subscription.belongsTo(Offer, { foreignKey: 'idoffer' });
// Offer.hasMany(Subscription, { foreignKey: 'idoffer' });

// module.exports = { User, Video, Comment, Rating, Subscription, Purchase, Offer };


// const User = require('./User');
// const Video = require('./Video');
// const Comment = require('./Comment');
// const Rating = require('./Rating');
// const Purchase = require('./Purchase');
// const Subscription = require('./Subscription');
// const Offer = require('./Offer');

// // Relaciones existentes
// User.hasMany(Video, { foreignKey: 'creatorId' });
// Video.belongsTo(User, { foreignKey: 'creatorId' });

// // Relación entre User y Comment (usuario crea comentarios)
// User.hasMany(Comment, { foreignKey: 'iduser' });
// Comment.belongsTo(User, { foreignKey: 'iduser' });

// // Relación entre Video y Comment (video tiene comentarios)
// Video.hasMany(Comment, { foreignKey: 'idvideo' });
// Comment.belongsTo(Video, { foreignKey: 'idvideo' });

// // Relación entre User y Rating (usuario califica videos)
// User.hasMany(Rating, { foreignKey: 'iduser' });
// Rating.belongsTo(User, { foreignKey: 'iduser' });

// // Relación entre Video y Rating (video recibe calificaciones)
// Video.hasMany(Rating, { foreignKey: 'idvideo' });
// Rating.belongsTo(Video, { foreignKey: 'idvideo' });

// // Relación entre User y Purchase (usuario realiza compras)
// User.hasMany(Purchase, { foreignKey: 'iduser' });
// Purchase.belongsTo(User, { foreignKey: 'iduser' });

// // Relación entre Subscription y Purchase (compra se asocia a suscripción)
// Subscription.hasMany(Purchase, { foreignKey: 'idsub' });
// Purchase.belongsTo(Subscription, { foreignKey: 'idsub' });

// // Relación entre Subscription y Offer (suscripción tiene ofertas)
// // Relación entre Subscription y Offer (suscripción tiene ofertas)
// Subscription.hasMany(Offer, { foreignKey: 'idsub', as: 'offers' });
// Offer.belongsTo(Subscription, { foreignKey: 'idsub', as: 'subscription' });


// module.exports = { User, Video, Comment, Rating, Subscription, Purchase, Offer };

const User = require('./User');
const Video = require('./Video');
const Comment = require('./Comment');
const Rating = require('./Rating');
const Purchase = require('./Purchase');
const Subscription = require('./Subscription');
const Offer = require('./Offer');

// Relaciones existentes
User.hasMany(Video, { foreignKey: 'creatorId' });
Video.belongsTo(User, { foreignKey: 'creatorId' });

// Relación entre User y Comment (usuario crea comentarios)
User.hasMany(Comment, { foreignKey: 'iduser' });
Comment.belongsTo(User, { foreignKey: 'iduser' });

// Relación entre Video y Comment (video tiene comentarios)
Video.hasMany(Comment, { foreignKey: 'idvideo' });
Comment.belongsTo(Video, { foreignKey: 'idvideo' });

// Relación entre User y Rating (usuario califica videos)
User.hasMany(Rating, { foreignKey: 'iduser' });
Rating.belongsTo(User, { foreignKey: 'iduser' });

// Relación entre Video y Rating (video recibe calificaciones)
Video.hasMany(Rating, { foreignKey: 'idvideo' });
Rating.belongsTo(Video, { foreignKey: 'idvideo' });

// Relación entre User y Purchase (usuario realiza compras)
User.hasMany(Purchase, { foreignKey: 'iduser' });
Purchase.belongsTo(User, { foreignKey: 'iduser' });

// Relación entre Subscription y Purchase (compra se asocia a suscripción)
Subscription.hasMany(Purchase, { foreignKey: 'idsub' });
Purchase.belongsTo(Subscription, { foreignKey: 'idsub' });

// Relación entre Subscription y Offer (suscripción tiene ofertas)
Subscription.hasMany(Offer, { foreignKey: 'idsub', as: 'offers' });
Offer.belongsTo(Subscription, { foreignKey: 'idsub', as: 'subscription' });

module.exports = { User, Video, Comment, Rating, Subscription, Purchase, Offer };
