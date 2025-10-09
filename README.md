# Express MongoDB OAuth Template

## Overview
This project is a starter template for building an Express.js web application that authenticates users with Google OAuth 2.0, stores their profiles in MongoDB, and renders server-side views with EJS. It demonstrates how to combine Passport.js strategies, secure session handling, and database persistence so that a signed-in visitor can access a protected profile area while anonymous users are redirected to the login flow.

## Key Features
- **Google OAuth 2.0 authentication**: Uses `passport-google-oauth20` to request a user's Google profile and handle the callback exchange defined in `config/passport-setup.js`.
- **Session management with encrypted cookies**: Persists login state across requests with `cookie-session`, configured in `index.js` to keep users signed in between visits.
- **MongoDB user persistence**: Stores Google profile identifiers, display names, and thumbnails in the `User` model under `models/user-model.js` via Mongoose.
- **Protected profile route**: Guards `/profile` requests in `routes/profile-routes.js`, rendering `views/profile.ejs` only when `req.user` is present.
- **Simple EJS views**: Includes minimal templates for home, login, and profile pages under the `views` directory to illustrate conditional navigation and displaying user data.

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure credentials**
   - Copy `config/keysDemo.js` to `config/keys.js`.
   - Replace the placeholder values with your Google OAuth client ID, client secret, MongoDB connection string, and a strong cookie session key.
   - Ensure your Google Cloud project has the OAuth consent screen and credentials configured with an authorized redirect URI of `http://localhost:3000/auth/google/redirect`.

3. **Run the application**
   ```bash
   node index.js
   ```

4. **Access the app**
   - Visit `http://localhost:3000/` for the public home page.
   - Choose **Login** to authenticate with Google; on success you will be redirected to `http://localhost:3000/profile`.

## Project Structure
```
index.js                # Express app setup, middleware, and route mounting
config/passport-setup.js# Passport strategy and user serialization
models/user-model.js    # Mongoose schema for Google users
routes/auth-routes.js   # Authentication endpoints
routes/profile-routes.js# Protected profile endpoint
views/*.ejs             # EJS templates for UI rendering
```

## Next Steps
- Extend the `User` schema with additional fields required by your application.
- Add environment-specific configuration handling (for example, using `.env` files).
- Replace the static views with a frontend framework or enhanced EJS templates as needed.
