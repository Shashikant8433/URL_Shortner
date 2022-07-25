const express = require('express');
const dotenv = require('dotenv');

const { auth, requiresAuth } = require("express-openid-connect")

const connectToDB = require("./db");
const shortcut = require("./routes/shortcut.route")
const shortcuts = require("./routes/shortcuts.route")
const home = require("./routes/home.route")

const app = express();
const port = process.env.PORT || 3000;
dotenv.config()

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
}));
app.use(express.json());

app.use("/shortcut", requiresAuth(), shortcut);
app.use("/shortcuts", requiresAuth(), shortcuts);
app.use("/", requiresAuth(), home);
// app.use("/:shortLink", requiresAuth(), home);


// app.use("/", home);
// app.use("/shortcut", shortcut);
// app.use("/shortcuts", shortcuts);

app.listen(port, () => {
  console.log(`~~~~~~~~~~~~~~~~~~~~app is running on port: ${port}~~~~~~~~~~~~~~~~~~~~`);
  connectToDB();
})



// "dotenv": "^16.0.1",
// "express": "^4.18.1",
// "express-openid-connect": "^2.7.3"

//npm run dev