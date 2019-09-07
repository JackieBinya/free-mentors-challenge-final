 # Free Mentors

[![Build Status](https://travis-ci.org/JackieBinya/free-mentors-challenge-2.svg?branch=develop)](https://travis-ci.org/JackieBinya/free-mentors-challenge-2) [![Coverage Status](https://coveralls.io/repos/github/JackieBinya/free-mentors-challenge-2/badge.svg?branch=develop)](https://coveralls.io/github/JackieBinya/free-mentors-challenge-2?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/66b1ea7d2f9031797098/maintainability)](https://codeclimate.com/github/JackieBinya/free-mentors-challenge-2/maintainability)

Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

## Table of Contents
 1. [Prerequisites](#Prerequisites)
 2. [Tools](#Tools)
 3. [Getting Started](#Getting-Started)
 4. [Installing the Api](#Installing-api)
 5. [Running Tests](#Running-the-tests)
 6. [API Endpoints](#Api-Endpoints)
 7. [External Links](#Links)
 8. [Author](#Author)
 
## Prerequisites

Before you clone this repo ensure that you have the following already installed on your machine
- *Visual Studio Code*: get it [here,](https://code.visualstudio.com/download) OR any text editor  OR IDE of your choice
- *git*: get it [here.](https://git-scm.com)
- *Node.js*: get it [here.](https://nodejs.org)
- *PostgreSQL*: get it [here.](https://www.postgresql.org/download/)

## Tools

- [Postman](https://www.getpostman.com/) is the only complete API development environment, and flexibly integrates with the software development cycle.
- Testing
..* [Mocha](https://mochajs.org/) A javascript testing framework.
..* [Chai](https://www.chaijs.com) A test assertion library for Javascript.
- [Swagger](https://swagger.io/) is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services
- [Pivotal Tracker](https://www.pivotaltracker.com) is the agile project management tool of choice for developers around the world for real-time collaboration around a shared, prioritized backlog.
- [Heroku](heroku.com) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Travis CI](https://travis-ci.org/) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
- [Coveralls](https://coveralls.io/) consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).

## Getting Started

To clone this repo run the following command

```sh
git@github.com:JackieBinya/free-mentors-challenge-2.git
```

## Set up the server

- Run the following command on your terminal run to install all dependencies listed in the package.json file ``
npm install
``
- Then  proceed to create a .env file, then set up all the environmental variables listed in the .env.sample file.
- To start your server, run the following command on the terminal ``
npm dev:start
``

## Running the tests

To run the test for the api

```sh
npm test
```

## API Endpoints

These are the endpoints for this api :

| HTTP Method        | Endpoint                 | Functionality|
| ------------- | --------------------------|------------|
| POST          | `/api/v1/auth/signup`   | Creates a new user account |
| POST          | `/api/v1/auth/signin`   | Allows an existing user to sign in |
| PATCH        | `/api/v1/user/:userId`    | Change a user to a mentor. |
| GET   | `/api/v1/mentors`| Get all mentors |
| GET  | `api/v1/mentors/:mentorId` |  Get a specific mentor |
| POST | `api/v1/sessions` | Create a  mentorship session request |
| PATCH  | `api/v1/sessions/:sessionId/accept` | A mentor can accept a mentorship session request |
| PATCH  | `api/v1/sessions/:sessionId/reject` | A mentor can reject a mentorship session request |
|  GET  | `api/v1/sessions` | Get all mentorship session requests |

## External Links

- UI Template for the application can be found here [Github pages.](https://jackiebinya.github.io/free-mentors-challenge-2/UI/)

- Pivotal Tracker Stories can found here [Pivotal tracker.](https://www.pivotaltracker.com/n/projects/2382168)

- Application was deployed to Heroku. Use public URL https://free-mentors-ch2.herokuapp.com/ with API endpoints.

- API Documenttion was generated with [swagger.](https://free-mentors-ch2.herokuapp.com/api-docs/)

## Author

- [I'm Nubian](jacquelinebinya@gmail.com)
