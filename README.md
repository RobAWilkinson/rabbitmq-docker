# Rabbitmq and Node

A simple test that allows rabbitmq to communicate between an arbitrary number of workers.

##Instructions

`docker-compose -f docker-compose.debug.yml up` for development
`docker-compose up` for production

web server listens on `localhost:3000` send a message as a query string param `?message=test`
