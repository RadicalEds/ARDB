const packageInfo = require('../../package.json');
const name = packageInfo.name;
const debug = require('debug')(`${name}:express`);

const fs = require('fs');
const express = require('express');
const path = require('node:path')

module.exports = async (apps) => {

	// Initiate
	const app = express();
	app.locals.apps = apps

	// Set View Engine
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug')

	// Set Public Docroot
	app.use(express.static(path.join(__dirname,'./docroot')));

    // Attach Middlewares
	app.use(express.urlencoded({extended:true}));
    const middlewarespath = path.join(__dirname, 'middlewares');
    const middlewares = (fs.readdirSync(middlewarespath)).filter(file => file.endsWith('.js'))
    for (const file of middlewares) {
        const filePath = path.join(middlewarespath, file)
        try {
            app.use(require(filePath));
        } catch(err) {
            console.error(`Error While loading Middleware: ${file}`)
            console.error(err)
        }
    }

	// Attach Routes
    const routespath = path.join(__dirname, 'routes');
    const routes = (fs.readdirSync(routespath)).filter(file => file.endsWith('.js'))
    for (const file of routes) {
        const filePath = path.join(routespath, file)
        try {
            const route = require(filePath);
            app.use(route.path, route.handler)
        } catch(err) {
            console.error(`Error While loading Route: ${file}`)
            console.error(err)
        }
    }

	// Start Express Server
	app.listen(process.env.BP_SERVER_PORT, function() {
		debug(`Listening on port ${process.env.BP_SERVER_PORT}`)
	});

	return app
}

