const passport = require('passport');
const User = require('../models/user');

// POST /api/register - create a local user and immediately return a JWT.
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const email = req.body.email.toLowerCase().trim();
    const existing = await User.findOne({ email }).exec();
    if (existing) {
      return res.status(409).json({ message: 'A user with that email already exists' });
    }

    const user = new User({ name: req.body.name.trim(), email });
    user.setPassword(req.body.password);
    await user.save();

    return res.status(200).json({ token: user.generateJWT() });
  } catch (err) {
    console.error('Unable to register user:', err);
    return res.status(500).json({ message: 'Unable to register user' });
  }
};

// POST /api/login - authenticate a local user through Passport and return a JWT.
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  return passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info || { message: 'Unauthorized' });
    return res.status(200).json({ token: user.generateJWT() });
  })(req, res, next);
};

module.exports = { register, login };
