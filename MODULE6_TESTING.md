# Module Six Testing Checklist

Run MongoDB, then start the Express backend (`npm start`) and Angular SPA (`cd app_admin && npm start`).

## Postman REST checks
1. GET `http://localhost:3000/api/trips` -> HTTP 200 and JSON array.
2. GET `http://localhost:3000/api/trips/GALR210214` -> HTTP 200 and one JSON trip.
3. POST `http://localhost:3000/api/trips` with all eight trip fields -> HTTP 201 and created JSON trip.
4. PUT `http://localhost:3000/api/trips/<tripCode>` with updated fields -> HTTP 200 and updated JSON trip.
5. DELETE `http://localhost:3000/api/trips/<tripCode>` -> HTTP 200 and deletion confirmation.
6. GET an unknown trip code -> HTTP 404.

## Brightspace screenshot checks
- Card Listing: add a unique fourth trip through Angular and capture the listing showing it.
- Edit screen: click Edit Trip for that trip and capture the populated form.
- Update screen: change a visible field, save, then capture the listing showing the persisted update.

Also visit `http://localhost:3000/travel` after adding/updating the trip to verify the Express customer site reflects the same MongoDB data.
