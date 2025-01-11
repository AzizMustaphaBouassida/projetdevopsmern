const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Route GET pour récupérer tous les véhicules
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Route GET pour récupérer un véhicule par son ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST pour créer un nouveau véhicule
router.post('/', async (req, res) => {
  const vehicle = new Vehicle({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    mileage: req.body.mileage
    // Ajoute d'autres champs si nécessaire
  });

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route PUT pour mettre à jour un véhicule existant
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    vehicle.brand = req.body.brand;
    vehicle.model = req.body.model;
    vehicle.year = req.body.year;
    vehicle.color = req.body.color;
    vehicle.mileage = req.body.mileage;
    

    const updatedVehicle = await vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route DELETE pour supprimer un véhicule
router.delete('/:id', async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.deleteOne({ _id: req.params.id });
    if (deletedVehicle.deletedCount === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router; 
