# Crime-alert-app

- Under development

## <a name="env"></a>.env file structure

- NODE_ENV = development
- DB_URI = xxxxxxxxxx
- DB_PASSWORD = xxxxxxxxxx
- JWT_SECRET = xxxxx

## How To run Backend API

```
git clone https://github.com/MananDesai54/Crime-alert-app.git
cd Crime-alert-app

cd server
npm install

npm start

```

## DataBases

- Total 5 DBs:
  1. User
     - First Name
     - Last Name
     - Email
     - Address
     - DOB
     - Mobile NO.
     - Password
     - ID
  2. Place
     - Location
       - Lat
       - Long
     - PlaceId
     - CrimeLevel
     - State
     - City
     - Address
  3. Relatives
     - Id
     - Firstname
     - Lastname
     - Mobile NO
     - email
     - userID
  4. PoliceStation
  5. Crime
