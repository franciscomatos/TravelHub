# TravelHub [![Build Status](https://travis-ci.com/tecnico-softeng/es19al_23-project.svg?token=xDPBAaQ2epnFt9PRstYY&branch=develop)](https://travis-ci.com/tecnico-softeng/es19al_23-project)[![codecov](https://codecov.io/gh/tecnico-softeng/es19al_23-project/branch/develop/graph/badge.svg?token=ujrECiGjBP)](https://codecov.io/gh/tecnico-softeng/es19al_23-project)

TravelHub is an [award winning project](https://tecnico.ulisboa.pt/pt/noticias/campus-e-comunidade/premio-novabase-desafia-alunos-a-aventurarem-se-na-criacao-de-uma-aplicacao/) that allows you to acquire and plan adventures in various destinations. 

## Getting Started

Download the .zip and open two command lines to run the backend and the frontend.

### Prerequisites

To start, you will need [Java SE](https://www.oracle.com/technetwork/java/javase/downloads/index.html), [Apache Maven](https://maven.apache.org) and [MySQL](https://dev.mysql.com/downloads/mysql/) to run the local databases.
Since Angular was used to create the frontend application you will also need Node.js and NPM installed in your machine. You can install both tools simultaneously by downloading and executing an installer (choose one based on your operating system) from the [Node.js download page](https://nodejs.org/en/download/).
After installing everything described above and correctly setting up all enviroment variables, you're good to go.

### Installing

After properly installing Node.js and NPM, you can use the npm command to install the Angular CLI tool and all dependencies.
Just run the following command inside the frontend directory:

```
npm install
```

You will also need to create the following databases in MySQL: advactivity, advbank, advbroker, advcar, advhotel, advtax.

Everything is now set up to run the app properly.
You can now start the backend servers by running the startservers executable in bin.
Wait a few moments until all servers are up and running and then start the angular application (run ng serve on the frontend directory) to check if everything is working as expected.
After Angular finishes compiling your app, you can browse to http://localhost:4200 and start browsing!

## Running the tests
To run tests execute: mvn clean install

To see the coverage reports, go to <module name>/target/site/jacoco/index.html.

### Infrastructure

This project includes the persistent layer, as offered by the FénixFramework.
This part of the project requires to create databases in mysql as defined in `resources/fenix-framework.properties` of each module.

See the lab about the FénixFramework for further details.

#### Docker (Alternative to installing Mysql in your machine)

To use a containerized version of mysql, follow these stesp:

```
docker-compose -f local.dev.yml up -d
docker exec -it mysql sh
```

Once logged into the container, enter the mysql interactive console

```
mysql --password
```

And create the 6 databases for the project as specified in
the `resources/fenix-framework.properties`.

To launch a server execute in the module's top directory: mvn clean spring-boot:run

To launch all servers execute in bin directory: startservers

To stop all servers execute: bin/shutdownservers

To run jmeter (nogui) execute in project's top directory: mvn -Pjmeter verify. Results are in target/jmeter/results/, open the .jtl file in jmeter, by associating the appropriate listeners to WorkBench and opening the results file in listener context

## Authors

* **Francisco Matos**
* **Pedro Custódio**
* **Pedro Bernardo**