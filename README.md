# Travel Tracker

This is a web application built with Node.js, Express, and PostgreSQL that allows users to track the countries they have visited. Users can add countries to their visited list and see a total count of visited countries.

## Features

- Track visited countries.
- Add new countries to the visited list.
- Display the total number of visited countries.
- Error handling for invalid or duplicate country entries.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installation
1. Install the dependencies:
    ```sh
    npm install
    ```

2. Set up PostgreSQL:
    - Ensure PostgreSQL is installed and running.
    - Create a database named `world`.
    - Create the necessary tables:
      ```sql
      CREATE TABLE countries (
        country_code VARCHAR(3) PRIMARY KEY,
        country_name VARCHAR(100) NOT NULL
      );

      CREATE TABLE visited_countries (
        country_code VARCHAR(3) REFERENCES countries(country_code) PRIMARY KEY
      );
      ```

3. Insert country data into the `countries` table (this is an example, ensure you have your own data):
    ```sql
    INSERT INTO countries (country_code, country_name) VALUES ('USA', 'United States of America');
    INSERT INTO countries (country_code, country_name) VALUES ('CAN', 'Canada');
    -- Add more countries as needed
    ```

4. Update the database connection settings in the code:
    ```javascript
    const db = new pg.Client({
      user: "postgres",
      host: "localhost",
      database: "world",
      password: "your_password",
      port: 5432,
    });
    ```

### Running the Application

1. Start the server:
    ```sh
    node index.js
    ```

## API Endpoints

### GET `/`

- **Description:** Displays the home page with a list of visited countries and the total count.
- **Response:** Renders `index.ejs` with the visited countries and total count.

### POST `/add`

- **Description:** Adds a new country to the visited list.
- **Request Body:**
    ```json
    {
      "country": "Country Name"
    }
    ```
- **Response:** Renders `index.ejs` with the updated list of visited countries, total count, and an error message if applicable.

## Example Usage

1. **View Home Page:**
    ```
    GET /
    ```

2. **Add a Country:**
    ```
    POST /add
    Body: { "country": "Canada" }
    ```
