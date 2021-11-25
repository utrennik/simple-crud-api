const supertest = require('supertest');
const uuid = require('uuid');
const app = require('./app');
const constants = require('./constants');

const okCode = constants.successCodes.OK;
const createdCode = constants.successCodes.CREATED;
const noContentCode = constants.successCodes.NO_CONTENT;
const notFoundCode = constants.errorCodes.NOT_FOUND;

const mockUser = {
	name: 'Alex',
	age: 38,
	hobbies: ['audio', 'swimming', 'coding'],
};

const mockUpdatedUser = {
	name: 'Kristina',
	age: 30,
	hobbies: ['instagram'],
};

describe('Testing REST API', () => {
	it('Should return empty array and code 200 on GET person/', async () => {
		await supertest(app)
			.get('/person')
			.expect(okCode)
			.then((res) => {
				const payload = res.body;
				expect(Array.isArray(payload)).toBeTruthy();
				expect(payload.length).toEqual(0);
			});
	});

	let createdPersonId;

	it('Should return created person with valid uuid with code 201 on POST person/', async () => {
		await supertest(app)
			.post('/person')
			.send(mockUser)
			.expect(createdCode)
			.then((res) => {
				const payload = res.body;
				expect(payload.name).toEqual(mockUser.name);
				expect(payload.age).toEqual(mockUser.age);
				expect(payload.hobbies.length).toEqual(mockUser.hobbies.length);
				expect(uuid.validate(payload.id)).toBeTruthy();
				createdPersonID = payload.id;
			});
	});

	it('Should return person with code 200 on GET persons/{id}', async () => {
		await supertest(app)
			.get(`/person/${createdPersonID}`)
			.send()
			.expect(okCode)
			.then((res) => {
				const payload = res.body;
				expect(payload.name).toEqual(mockUser.name);
				expect(payload.age).toEqual(mockUser.age);
				expect(payload.hobbies.length).toEqual(mockUser.hobbies.length);
			});
	});

	it('Should return updated person with code 200 on PUT persons/{id}', async () => {
		await supertest(app)
			.put(`/person/${createdPersonID}`)
			.send(mockUpdatedUser)
			.expect(okCode)
			.then((res) => {
				const payload = res.body;
				expect(payload.name).toEqual(mockUpdatedUser.name);
				expect(payload.age).toEqual(mockUpdatedUser.age);
				expect(payload.hobbies.length).toEqual(mockUpdatedUser.hobbies.length);
			});
	});

	it('Should delete person with code 204 on PUT persons/{id}', async () => {
		await supertest(app)
			.delete(`/person/${createdPersonID}`)
			.send()
			.expect(noContentCode);
	});

	it('Should get error 404 on GET persons/{id} if there is no person with {id}', async () => {
		await supertest(app)
			.delete(`/person/${createdPersonID}`)
			.send()
			.expect(notFoundCode);
	});
});
