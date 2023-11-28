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

## Future Enchancements

While CryptoTrackr is currently equipped with essential features, there are opportunities for future enhancements to further improve the user experience and functionality. Here are some potential areas for development:

1. Real-Time Notifications:
   - Implement a notification system to alert users about significant changes in cryptocurrency prices or important account activities.
1. Advanced Charting:
   - Enhance the charting capabilities to allow users to analyze historical cryptocurrency price data using advanced charting tools and technical indicators.
1. User Preferences:
   - Introduce a user preferences section where users can customize their dashboard, set default currencies, and choose preferred cryptocurrencies.
