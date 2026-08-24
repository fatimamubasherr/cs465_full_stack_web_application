# Travlr Getaways — CS 465 Module Seven

This submission is the completed Module Seven full-stack Travlr application. It extends the Module Six Angular admin SPA and Express/MongoDB REST API with authentication and protected administrative operations.

## Security functionality

- Local user records with salted PBKDF2 password hashes
- Passport local authentication
- JSON Web Tokens (JWTs) with one-hour expiration
- `/api/register` and `/api/login` endpoints
- JWT middleware protecting trip create, update, and delete operations
- Angular admin login form and login/logout navigation
- JWT persistence using browser local storage (`travlr-token`)
- Angular HTTP interceptor that supplies Bearer tokens to protected API calls
- Add/Edit/Delete controls shown only to authenticated users

## Run

From the project root:

```bash
npm install
npm start
```

In a second terminal:

```bash
cd app_admin
npm install
npm start
```

Express: `http://localhost:3000`  
Angular admin SPA: `http://localhost:4200`

See `MODULE7_TESTING.md` for the Postman mock-user and end-to-end authentication tests.
