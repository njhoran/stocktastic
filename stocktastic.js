'use strict';

require('dotenv').config();
const path = require('path');
const http = require('http');
const app = require('connect')();

const swaggerTools = require('swagger-tools');
const config = require('config');

const serverPort = config.get('port');

const routerOptions = {
	controllers : path.join(__dirname, './lib/controllers'),
	useStubs    : config.get('testMode')
};

const swaggerDoc = require('./swagger/swagger.js');

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
	app.use( middleware.swaggerMetadata() );
	app.use( middleware.swaggerValidator() );
	app.use( middleware.swaggerRouter(routerOptions) );
		
	const swaggerUi = '/docs';
	const apiDocs = '/api-docs';

	app.use( middleware.swaggerUi({ swaggerUi, apiDocs }) );

	const server = http.createServer(app);
	server.listen(serverPort);

	server.on('listening', () => {
		console.log(`Alive and kicking on port ${serverPort}`);
	});

	server.on('error', (err) => {
		console.error(err);
	});

	// signal handling
	process
	.on('SIGINT', () => {
		console.log('Received SIGINT signal, shutting down gracefully.');
		process.exit(0);
	})
	.on('SIGTERM', () => {
		console.log('Received SIGTERM signal, shutting down gracefully.');
		process.exit(0);
	});
});

module.exports = app;
