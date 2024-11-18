# Car Wash Booking System

Welcome to the Car Washing System! This application is built using Express.js, MongoDB, Mongoose and TypeScript to help you efficiently manage your car washing system.

**Getting Started**
To get started with the Car Washing System locally, follow these steps:

## Clone this repository to your local machine:

git clone [https://github.com/Source-Code-007/car-washing-system.git](https://github.com/Source-Code-007/car-washing-system.git)

**Navigate into the project directory:** cd car_washing_system
**Install dependencies:** yarn install

**Set up your environment variables:**
Create a .env file in the root directory and provide the following variables:

###### **NODE_ENV**=development | production

###### **PORT**=5000

###### **MONGO_URI**=your_mongodb_connection_string

###### **SALT_ROUNDS**=your_SALT_ROUNDS_for_passoword_hash

###### **JWT_ACCESS_SECRET**=for_JWT_access_token

## Technology used

- TypeScript
- Express.js
- MongoDB
- Mongoose
- ZOD
- JWT


## Features

- Authentication
- Authorization
- Admin can create, update and delete services
- Admin can create slot for services
- User can book a slot
- Services page with filtering , searching and sorting
- Role base page access
- User dashboard and Admin dashboard

Running the Server by- **yarn dev**

Local Base URL: **[Link](http://localhost:5500/api/v1)**

Production Base URL: **[Link](https://car-washing-system.onrender.com/api/v1)**
