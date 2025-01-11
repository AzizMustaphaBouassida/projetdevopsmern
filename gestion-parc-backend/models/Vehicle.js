const mongoose = require('mongoose');

// Définition du schéma MongoDB pour les véhicules
const vehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true }, // Marque du véhicule (obligatoire)
  model: { type: String, required: true }, // Modèle du véhicule (obligatoire)
  year: { type: Number, required: true },  // Année de fabrication du véhicule (obligatoire)
  color: { type: String },                  // Couleur du véhicule
  mileage: { type: Number },                // Kilométrage du véhicule
  // Ajoute d'autres champs si nécessaire
});

// Exporte le modèle de véhicule pour être utilisé dans d'autres fichiers
module.exports = mongoose.model('Vehicle', vehicleSchema);
 