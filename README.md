# MCOVISION Facedetection

This project is a monorepo that contains multiple yarn workspaces :

backend is a NestJS 9 application that serves a GraphQL API

frontend is a React 18 application


## Database

The application services are using a PostgreSQL 14 database

### Running the whole application

You can launch all the application as dockerized micro-services with docker-compose in the root directory of the project

```
$ docker-compose up
```
For debugging purposes, it is possible to use a debug mode where [pgadmin4](https://www.pgadmin.org) will be launched alongside
the database at `http://localhost:5000`

```
$ docker-compose --profile debug up
```

