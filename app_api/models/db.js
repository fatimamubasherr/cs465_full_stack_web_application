const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

// Build the connection and allow MongoDB time to finish starting locally.
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI), 1000);
};

// Monitor connection events.
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Windows-specific listener that forwards Ctrl+C to Node.
if (process.platform === 'win32') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

// Configure graceful shutdown.
const gracefulShutdown = async (message) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${message}`);
};

// Shutdown invoked by a nodemon restart.
process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

// Shutdown invoked by application termination.
process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

// Shutdown invoked by container termination.
process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

// Make the initial database connection and register the schema.
connect();
require('./travlr');
require('./user');

module.exports = mongoose;
