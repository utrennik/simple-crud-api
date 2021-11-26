## simple-crud-api

Simple REST API to work with persons objects

# Getting Started

1. Clone this repo to your local machne.

2. Install dependencies:

```
npm install
```

3. To run app in developement mode:

```
npm run start:dev
```

4. To run app in Production mode:

```
npm run start:prod
```

The app will run at your localhost:{PORT}/
The PORT can be changed in the .env file (default port: 3000).

# Testing:

To run tests:

```
npm run test
```

# REST API description:

GET /person returns all persons

GET /person/{personId} returns person with {personId}

POST /person cerates new person with request payload

PUT /person/{personId} updates person with {personId} with payload data

DELETE /person/{personId} removes person with {personId}
