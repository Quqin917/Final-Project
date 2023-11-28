# CryptoTrackr

## Introduction

CryptoTrackr is a real-time cryptocurrency price tracking web application developed as the final project for the CS50 2023 online course offered by Harvard University. Built around Node.js, HTML, JavaScript, and CSS, The application allow users to monitor live changes in cryptocurrency prices.

## Key Features

- Real-time cryptocurrency price tracking.
- Watchlist functionality for adding and deleteing cryptocurrencies.
- Secure user authenctication using bcrypt and password encryption.

## Backend

- **[server.js](./server.js)**: This File is where most server logic resides. The first lines of code (1 - 11) start with require declarations, and lines (13 - 47) are dedicated to server configuration. The code from lines (49 - 55) is defines routers for different pages of the website:

- **[Homepage](./src/routes/index.js)**
- **[Authentication](./src/routes/auth.js)**
- **[Cryptocurrency](./src/routes/crypto.js)**

  The final lines (57 - 59) ensure the server is running and accessible throught the web.

## Frontend

The frontend of the application is organized into folders:

- **Public**: Contains images and styles used in the frontend.

  - **Image**: Includes images for various cryptocurrencies.
  - **JavaScript**: Holds JavaScript files for different functionalities like login, navigation, and search.
  - **Style**: Consists of CSS files for styling different components of the application.

- **Src**: Contains the core logic of the application.

  - **Config**: Houses configuration files such as `cryptoControl.js` and `helper.js`.
  - **Middleware**: Includes middleware functions for authentication and crypto-related functionality.
  - **Models**: Defines MongoDB models for crypto and user data.
  - **Routes**: Contains route definitions for authentication and cryptocurrency-related pages.

- **Views**: Contains EJS templates for different pages such as adding and deleting cryptocurrencies, user registration, and login.

## User Security

When The User wished to login for accessing the watchlist. The user password and username is store at a databases, and the databases in the application is using MongoDB. But before the password gotten inserted into the databases, the program will be encrypted into some random word and number that been combine into one. This funnction is from bcrypt library.
