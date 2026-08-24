// Bring in the database connection and Trip schema.
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

// Read seed data from the JSON file.
const tripsPath = path.join(__dirname, '..', '..', 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

// Delete existing records, then insert the current seed data.
const seedDB = async () => {
  await Trip.deleteMany({});
  const insertedTrips = await Trip.insertMany(trips);
  console.log(`Seeded ${insertedTrips.length} trips into the travlr database.`);
};

seedDB()
  .then(async () => {
    await mongoose.connection.close();
    console.log('Database seed completed and connection closed.');
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Database seed failed:', err);
    await mongoose.connection.close();
    process.exit(1);
  });
