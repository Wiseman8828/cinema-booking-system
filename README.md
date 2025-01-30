# cinema-booking-system
A Node.js and TypeScript application for for managing cinema ticket purchases with MySQL as the database. 

## Features
- Create a cinema with N seats and receive a cinema ID.
- Purchase a specific seat in a cinema.
- Purchase the first two available consecutive seats.


## Project Structure
src/ 
├── controllers/ # Business logic for each route 
├── database/ # Database pool connection
├── models/ # Sequelize schemas 
├── routes/ # Route handlers for APIs 
├── config.ts/ # Configuration for env variables, DB, etc. 
├── app.ts # Express app setup ├── server.ts # Server entry point


## Setup

### Prerequisites
- Node.js
- MySQL
- Docker (optional for containerization)

### Installation
1. Clone the repository:
``` bash
  git clone https://github.com/Wiseman8828/cinema-booking-system.git
  cd cinema-booking-system
```

2. Install dependencies:
``` bash
  npm install
```
3. Configure environment variables: Create a .env file with the following:
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=grocery
  JWT_SECRET=your_secret_key

4. Start the application:
``` bash
  npm start
```

5. Test the application:
``` bash
  npm test
```

6. Run the app with Docker:
``` bash
  docker build -t cinema-book-api-ts .
  docker run -d -p 3000:3000 --name cinema-booking cinema-book-api-ts
``` bash

7. Postman Collection
  A separate file i.e API.postman_collection.json containing a Postman collection of all the APIs is included in the project. You can import it into Postman for quick and easy testing of all endpoints.
