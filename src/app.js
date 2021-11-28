const http = require('http');
const constants = require('./constants');
const NotFoundError = require('./errors/not-found-error');
const {
  processGetPersons,
  processGetPersonByID,
  processPostPerson,
  processPutPersonData,
  processDeletePerson,
} = require('./controllers/persons-controller');

const contentTypeJSON = { 'Content-Type': 'application/json' };
const { methods } = constants;

const app = http.createServer(async (req, res) => {
  try {
    const { method, url } = req;
    const splittedURL = url.split('/');
    const category = splittedURL[1];
    const id = splittedURL[2];

    if (
      (!id && splittedURL.length > 2)
      || (id && splittedURL.length > 3)
      || category !== constants.categories.person
    ) {
      throw new NotFoundError();
    }

    if (method === methods.GET && !id) {
      processGetPersons(res);
    } else if (method === methods.GET && id) {
      processGetPersonByID(res, id);
    } else if (method === methods.POST && !id) {
      processPostPerson(req, res, id);
    } else if (method === methods.PUT && id) {
      processPutPersonData(req, res, id);
    } else if (method === methods.DELETE && id) {
      processDeletePerson(res, id);
    } else {
      throw new NotFoundError();
    }
  } catch (e) {
    const errorCode = e.errorCode || constants.errorCodes.INTERNAL_SERVER_ERROR;

    res.writeHead(errorCode, contentTypeJSON);
    res.end(JSON.stringify({ message: e.message }));
  }
});

module.exports = app;
