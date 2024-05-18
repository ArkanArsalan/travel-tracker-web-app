import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import dotenv from 'dotenv'

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.POSTGRESQL_PASS,
  port: 5432,
})

db.connect();

async function selectVisitedCountries() {
  const queryResult = await db.query("SELECT country_code FROM visited_countries");
  let visitedCountries = [];

  queryResult.rows.forEach((country) => {
    visitedCountries.push(country.country_code);
  });

  return visitedCountries;
}

// Get home page
app.get("/", async (req, res) => {
  const visitedCountries = await selectVisitedCountries();

  res.render("index.ejs", {
    countries: visitedCountries,
    total: visitedCountries.length,
  });

});

// Add country
app.post("/add", async (req, res) => {
  const countryName = req.body.country.trim().toLowerCase();
  let errorMessage = null;


  const searchCountry = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ", [countryName]);

  if (searchCountry.rowCount != 0) {
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES($1)", [searchCountry.rows[0].country_code]);
    } catch (error) {
      console.log(error);
      errorMessage = "Country already been added, try again";
    }
  } else {
    errorMessage = "Country not found";
  }

  const visitedCountries = await selectVisitedCountries();

  res.render("index.ejs", {
    countries: visitedCountries,
    total: visitedCountries.length,
    error: errorMessage
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
