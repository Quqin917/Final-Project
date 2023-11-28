# CryptoTrackr

## Introduction

This project is made as final project for CS50 2023 online course that has been offered by Harvard University. This is a web application that has been build around node.js and other programming languange such as HTML, JavaScript, and CSS. The application is design to tracking cryptocurrency real time price.

The main function of the application is at the live change of cryptocurrency price, where the user can adding new crypto into the watchlist, and delete cryptocurrency that has been in the watchlist.

## Backend

- [server.js](./server.js)

  This File is where most server logic resides. The first lines of code (1 - 11) start with require declarations, and for (13 - 47) is use for server configuratin.

  The next code refer to the routes for the responding page

  - [Homepage](./src/routes/index.js)

  * [Authentication](./src/routes/auth.js)

  - [Cryptocurrency](./src/routes/crypto.js)

## User Security

When The User wished to login for accessing the watchlist. The user password and username is store at a databases, and the databases in the application is using MongoDB. But before the password gotten inserted into the databases, the program will be encrypted into some random word and number that been combine into one. This funnction is from bcrypt library.
