require('dotenv').config()
// Get the express module.
const express = require('express');
const { createClient } = require('mta-realtime-subway-departures');
const path = require('path');

// Create a new Express application (web server)
const app = express();

app.use("/static", express.static("./build/static/"));

const client = createClient(process.env.MTA_API_KEY);

// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 8080
const PORT = process.env.PORT || 8080;

app.get('/api/departures.json', async (request, response) => {
  const complexIds = request.query.complexIds;
  const departuresResponse = await client.departures(complexIds);
  response.json(departuresResponse);
});

// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function(request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}


// Start the web server listening on the provided port.
app.listen(PORT, () => { 
  console.log(`Express web server listening on port ${PORT}`);
});