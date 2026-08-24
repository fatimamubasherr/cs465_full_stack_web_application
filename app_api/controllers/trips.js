const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips - return all trip documents.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ name: 1 }).exec();
    return res.status(200).json(trips);
  } catch (err) {
    console.error('Unable to retrieve trips:', err);
    return res.status(500).json({ message: 'Unable to retrieve trips' });
  }
};

// GET /api/trips/:tripCode - return one trip by code.
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;
  if (!tripCode) return res.status(400).json({ message: 'Trip code is required' });
  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();
    if (!trip) return res.status(404).json({ message: `Trip with code '${tripCode}' was not found` });
    return res.status(200).json(trip);
  } catch (err) {
    console.error(`Unable to retrieve trip ${tripCode}:`, err);
    return res.status(500).json({ message: 'Unable to retrieve trip' });
  }
};

// POST /api/trips - create a trip.
const tripsAddTrip = async (req, res) => {
  try {
    const existing = await Trip.findOne({ code: req.body.code }).exec();
    if (existing) return res.status(409).json({ message: `Trip code '${req.body.code}' already exists` });
    const trip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    return res.status(201).json(trip);
  } catch (err) {
    console.error('Unable to add trip:', err);
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unable to add trip' });
  }
};

// PUT /api/trips/:tripCode - update an existing trip.
const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true, runValidators: true }
    ).exec();
    if (!trip) return res.status(404).json({ message: `Trip with code '${req.params.tripCode}' was not found` });
    return res.status(200).json(trip);
  } catch (err) {
    console.error(`Unable to update trip ${req.params.tripCode}:`, err);
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Unable to update trip' });
  }
};

// DELETE /api/trips/:tripCode - remove an existing trip.
const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();
    if (!trip) return res.status(404).json({ message: `Trip with code '${req.params.tripCode}' was not found` });
    return res.status(200).json({ message: `Trip '${req.params.tripCode}' deleted`, trip });
  } catch (err) {
    console.error(`Unable to delete trip ${req.params.tripCode}:`, err);
    return res.status(500).json({ message: 'Unable to delete trip' });
  }
};

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };
