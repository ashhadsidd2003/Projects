import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_CITY = "http://api.openweathermap.org/geo/1.0/direct";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { error: null });
});

app.get("/getforecast", async (req, res) => {
  const city = (req.query.city || "").trim();
  if (!city) {
    return res.render("index.ejs", { error: "City missing" });
  }

  try {
    const geoRes = await axios.get(API_CITY, {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY,
      },
    });

    if (geoRes.data.length === 0) {
      return res.render("index.ejs", { error: "City not found. Check spelling." });
    }

    const location = {
      lat: geoRes.data[0].lat,
      lon: geoRes.data[0].lon,
    };

    const weatherRes = await axios.get(API_URL, {
      params: {
        lat: location.lat,
        lon: location.lon,
        appid: API_KEY,
        units: "metric",
      },
    });

    const forecasts = weatherRes.data.list;
    if (!forecasts || forecasts.length === 0) {
      return res.render("index.ejs", { error: "No forecast data available for this location." });
    }

    const tomorrow = forecasts[8];
    if (!tomorrow) {
      return res.render("index.ejs", { error: "Tomorrow's forecast not found." });
    }

    const weatherMain = tomorrow.weather[0].main.toLowerCase();
    const pop = tomorrow.pop || 0;
    const rainAmount = tomorrow.rain ? tomorrow.rain["3h"] || 0 : 0;

    const willRain = weatherMain.includes("rain") || pop > 0.3 || rainAmount > 0;

    const message = willRain
      ? `${city} — 🌧️ Rain expected tomorrow (pop: ${Math.round(pop * 100)}%, rain mm: ${rainAmount || 0})`
      : `${city} — ☀️ No Rain expected tomorrow (pop: ${Math.round(pop * 100)}%)`;

    return res.render("weather.ejs", { city, tomorrow, message });
  } catch (error) {
    console.error("Error in /getforecast:", error?.response?.data || error.message || error);
    return res.render("index.ejs", { error: "City not found or Api error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
