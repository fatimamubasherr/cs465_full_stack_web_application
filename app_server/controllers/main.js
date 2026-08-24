/* GET home page. */
const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    homeActive: true
  });
};

module.exports = {
  index
};
