const constants = require('../constants');
const {
	getPersons,
	getPersonByID,
	addPerson,
	updatePerson,
	deletePerson,
} = require('../repositories/persons');
const getReqPayload = require('../utils/get-req-payload.js');

const okCode = constants.successCodes.OK;
const createdCode = constants.successCodes.CREATED;
const contentTypeJSON = { 'Content-Type': 'application/json' };

const processGetPersons = (req, res) => {
	const persons = getPersons();

	sendResponse(res, okCode, persons);
};

const processGetPersonByID = (req, res, id) => {
	const person = getPersonByID(id);

	sendResponse(res, okCode, person);
};

const processPostPerson = async (req, res, id) => {
	const reqPayload = await getReqPayload(req);
	const personData = JSON.parse(reqPayload);
	const addedPerson = addPerson(personData, id);

	sendResponse(res, createdCode, addedPerson);
};

const processPutPersonData = async (req, res, id) => {
	const reqPayload = await getReqPayload(req);
	const personData = JSON.parse(reqPayload);
	const updatedPerson = updatePerson(id, personData);

	sendResponse(res, okCode, updatedPerson);
};

const processDeletePerson = (req, res, id) => {
	deletePerson(id);
	const noContentCode = constants.successCodes.NO_CONTENT;

	sendResponse(res, noContentCode, '');
};

const sendResponse = (res, code, payload) => {
	res.writeHead(code, contentTypeJSON);
	res.end(JSON.stringify(payload));
};

module.exports = {
	processGetPersons,
	processGetPersonByID,
	processPostPerson,
	processPutPersonData,
	processDeletePerson,
};
