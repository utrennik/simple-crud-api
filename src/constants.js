module.exports = {
	methods: {
		GET: 'GET',
		POST: 'POST',
		PUT: 'PUT',
		DELETE: 'DELETE',
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
