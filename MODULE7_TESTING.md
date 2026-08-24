# CS 465 Module Seven Security Testing

## Run the application

Terminal 1, from the `travlr` folder:

```bash
npm install
npm start
```

Terminal 2:

```bash
cd app_admin
npm install
npm start
```

The Express application runs at `http://localhost:3000` and the Angular admin SPA runs at `http://localhost:4200`.

## Postman: register a mock admin user

**POST** `http://localhost:3000/api/register`

Body → **x-www-form-urlencoded**

- `name`: `Travlr Admin`
- `email`: `admin@travlr.com`
- `password`: `TravlrPass123!`

Expected result: HTTP 200 and a JSON body containing `token`.

## Postman: login

**POST** `http://localhost:3000/api/login`

Body → **x-www-form-urlencoded**

- `email`: `admin@travlr.com`
- `password`: `TravlrPass123!`

Expected result: HTTP 200 and a fresh JWT in the `token` property.

## Postman: verify protected API behavior

Use a POST, PUT, or DELETE trip request **without** Authorization. Expected result: HTTP 401.

Then repeat with Authorization → **Bearer Token** and paste the JWT returned by `/api/login`. Expected result: the authenticated CRUD request succeeds when the supplied trip data is valid.

Change one character in the JWT and resend. Expected result: HTTP 401, demonstrating that malformed/invalid tokens are rejected.

## Angular SPA test

1. Open `http://localhost:4200` while logged out. Trips remain readable, but Add/Edit/Delete administration controls are hidden.
2. Choose **Log In**.
3. Enter a name, `admin@travlr.com`, and `TravlrPass123!`.
4. After successful login, the SPA stores the JWT as `travlr-token` in browser local storage.
5. Add/Edit/Delete controls become visible.
6. Perform a CRUD update. The JWT interceptor adds `Authorization: Bearer <token>` automatically.
7. Choose **Log Out**. The token is removed and administration controls disappear again.
