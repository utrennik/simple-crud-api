module.exports = {
  methods: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },

  successCodes: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },

  errorCodes: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  URLs: {
    person: '/person',
  },

  categories: {
    person: 'person',
  },
};
