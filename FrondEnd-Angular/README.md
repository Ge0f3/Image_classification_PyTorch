# UdpAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.

# Deploy the app with Docker 
Assume you have [Docker](https://www.docker.com/) Installed.

First fork or clone this repo:

usign `git clone https://github.com/Ge0f3/UDA_PILOT.git`

After cloning the repository go inside the project folder:

`cd UDA_PILOT/udp-angular`

Build docker using  `docker build -t angular:latest .` After deploy the app using `docker run -d -p 4200:4200 angular`

In your browser navigate to: `http://localhost:4200`(or whatever port you have mention in the docker build) to see the app up and running 

# Working without docker
I highly recommend the use of docker as it is far simpler to get started than to run all of the following manually.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
