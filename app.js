require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const passport = require('passport');

// Initialize MongoDB and register the application's Mongoose models.
require('./app_api/models/db');
require('./app_api/config/passport');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/layout' });
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), { index: false }));
app.use(passport.initialize());

// Allow the Angular admin SPA to call the REST API, including Bearer tokens.
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
});

app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);

// Authentication errors return a clean 401 JSON response.
app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: `${err.name}: ${err.message}` });
  }
  if (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
  return next();
});

app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  return res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`Travlr Getaways running at http://localhost:${port}`);
});
