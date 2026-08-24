const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

/* GET travel page using data supplied by the REST API. */
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      const apiError = await response.json().catch(() => ({}));
      const message = apiError.message || `API request failed with status ${response.status}`;
      return res.status(response.status).render('travel', {
        title: 'Travel - Travlr Getaways',
        travelActive: true,
        trips: [],
        error: message
      });
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).render('travel', {
        title: 'Travel - Travlr Getaways',
        travelActive: true,
        trips: [],
        error: 'The Trips API returned an invalid response.'
      });
    }

    if (trips.length === 0) {
      return res.status(404).render('travel', {
        title: 'Travel - Travlr Getaways',
        travelActive: true,
        trips: [],
        error: 'No trips are currently available.'
      });
    }

    return res.render('travel', {
      title: 'Travel - Travlr Getaways',
      travelActive: true,
      trips
    });
  } catch (err) {
    console.error('Unable to load trips from the API:', err);
    return res.status(500).render('travel', {
      title: 'Travel - Travlr Getaways',
      travelActive: true,
      trips: [],
      error: 'The travel information could not be loaded. Please try again later.'
    });
  }
};

module.exports = {
  travel
};
