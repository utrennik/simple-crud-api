require('dotenv').config();
const http = require('http');
const uuid = require('uuid');
const constants = require('./constants');
const NotFoundError = require('./errors/not-found-error');
const {
	getPersons,
	getPersonByID,
	addPerson,
	updatePerson,
	deletePerson,
} = require('./repositories/persons');
const getReqPayload = require('./utils/get-req-payload.js');

const okCode = constants.successCodes.OK;
const createdCode = constants.successCodes.CREATED;
const contentTypeJSON = { 'Content-Type': 'application/json' };
const { methods } = constants;

const server = http.createServer(async (req, res) => {
	try {
		const { method, url } = req;
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

		let responseCode, responsePayload;

		if (method === methods.GET && !id) {
			const persons = getPersons();

			responseCode = okCode;
			responsePayload = JSON.stringify(persons);
		} else if (method === methods.GET && id) {
			const person = getPersonByID(id);

			responseCode = okCode;
			responsePayload = JSON.stringify(person);
		} else if (method === methods.POST && !id) {
			const reqPayload = await getReqPayload(req);
			const personData = JSON.parse(reqPayload);
			const addedPerson = addPerson(personData, id);

			responseCode = createdCode;
			responsePayload = JSON.stringify(addedPerson);
		} else if (method === methods.PUT && id) {
			const reqPayload = await getReqPayload(req);
			const personData = JSON.parse(reqPayload);
			const updatedPerson = updatePerson(id, personData);

			responseCode = okCode;
			responsePayload = JSON.stringify(updatedPerson);
		} else if (method === methods.DELETE && id) {
			deletePerson(id);
			const noContentCode = constants.successCodes.NO_CONTENT;

			responseCode = noContentCode;
			responsePayload = '';
		} else {
			throw new NotFoundError();
		}

		res.writeHead(responseCode, contentTypeJSON);
		res.end(responsePayload);
	} catch (e) {
		const errorCode = e.errorCode || constants.errorCodes.INTERNAL_SERVER_ERROR;

		res.writeHead(errorCode, contentTypeJSON);
		res.end(JSON.stringify({ message: e.message }));
	}
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('\x1b[33m%s\x1b[0m', `Server started on port: ${PORT}`);
});
