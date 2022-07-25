const mongoose = require('mongoose');

async function db() {
  const dbUri = process.env.MONGODB as string;
  try {
    await mongoose
      .connect(dbUri)
      .then(() => {
        console.log(`~~~~~~~~~~~~~~~~~~~~DB connected~~~~~~~~~~~~~~~~~~~~`);
      });
  } catch (e) {
    console.error(e);
  }
}

module.exports = db;