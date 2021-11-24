require('dotenv').config();
const http = require('http');
const uuid = require('uuid');
const constants = require('./constants');
const NotFoundError = require('./errors/not-found-error');

const server = http.createServer(async (req, res) => {
	try {
		const { method, url } = req;
		const { methods } = constants;
		const splittedURL = url.split('/');
		const category = splittedURL[1];
		const id = splittedURL[2];

		if (
			(!id && splittedURL.length > 2) ||
			(id && splittedURL.length > 3) ||
			category !== constants.categories.person
		) {
			throw new NotFoundError();
		}

		if (method === methods.GET) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write('Get Person(s)');
		} else if (method === methods.POST && id) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write('Post Person(s)');
		} else if (method === methods.PUT && id) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write('Put Person');
		} else if (method === methods.DELETE && id) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write('Delete Person');
		} else {
			throw new NotFoundError();
		}

		res.end();
	} catch (e) {
		const errorCode = e.errorCode || constants.errorCodes.INTERNAL_SERVER_ERROR;

		res.writeHead(errorCode, { 'Content-type': 'application/json' });
		res.end(JSON.stringify({ message: e.message }));
	}
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('\x1b[33m%s\x1b[0m', `Server started on port: ${PORT}`);
});
