# Content

- [Details](#Crime-alert-app)
- [Tech Stack](#Technology-Stack)
- [Features](#features)
- [How To Run App and API](#How_To_Run)
- [Env Structure](#env)
- [Contribution Guide](#How_to_Contribute?)

# Crime-alert-app

- Main Goal
  - Whenever someone is in panic condition he/she can immediately ask for help to near by police-station and also contacting family members by only one tap in app and with more additional [features](#features)

# Technology-Stack

- Node.js
- Express.js
- MongoDB
- React Native

## Features

- UI and API common

```md
- Authentication
- adding close friends
- user profile manage
- sending alert to friends
- notifications on alert to relatives, on seen alert, on adding as relative when relative join,
- send alerts doesn't require to be loggedIn
- Police side Auth
```

- More UI stuff less API

```md
- Getting user location and showing in map
- settings screen
- recent alerts screen
- shake to send alerts
- showing area detail in map
- graph of particular location/month
- offline activity
- awesome loader
- crime history
```

# How_To_Run

- Install Node.js and mongoDB

- ## How To run backend API

- Follow below [.env](#env) structure

```bash
$ git clone https://github.com/MananDesai54/Crime-alert-app.git
$ cd Crime-alert-app

$ npm install

$ npm start
```

- ## How To run Front-end App

- Install Node.js and expo-cli

```bash
$ git clone https://github.com/MananDesai54/Crime-alert-app.git
$ cd Crime-alert-app

$ cd app
$ npm install

$ npm start
```

## env

```js
NODE_ENV = development;
DB_URI = xxxxxxxxxx;
DB_PASSWORD = xxxxxxxxxx;
JWT_SECRET = xxxxx;
EMAIL_ID = xxxxx;
EMAIL_PASSWORD = xxxxxxx;
EXPO_ACCESS_TOKEN = xxxxxxxxx;
```

## How_to_Contribute?

- Create issue for updates, bugs or improvements
- Feel free to clone, add features and make pull requests

#### Press that ⭐ to appreciate our work 💖
