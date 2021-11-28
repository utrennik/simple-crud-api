const uuid = require('uuid');
const { NotFoundError, BadRequestError } = require('../errors');

const persons = [];

const validatePerson = (person) => {
  const isValidPerson = person.name
    && person.age
    && person.hobbies
    && Array.isArray(person.hobbies);

  if (!isValidPerson) throw new BadRequestError('Invalid person data!');
};

const getPersons = () => persons;

const getPersonByID = (id) => {
  const isValidID = uuid.validate(id);

  if (!isValidID) throw new BadRequestError('Invalid person ID!');

  const output = persons.find((person) => person.id === id);

  if (!output) throw new NotFoundError(`Person with ID ${id} not found!`);

  return output;
};

const addPerson = (person) => {
  validatePerson(person);

  const personToAdd = { ...person, id: uuid.v4() };
  persons.push(personToAdd);

  return personToAdd;
};

const updatePerson = (id, personData) => {
  const isValidID = uuid.validate(id);
  if (!isValidID) throw new BadRequestError('Invalid person ID!');

  let foundPersonIndex;

  const personToUpdate = persons.find((person, i) => {
    if (person.id === id) {
      foundPersonIndex = i;
      return true;
    }
    return false;
  });

  if (!personToUpdate) throw new NotFoundError(`Person with ID ${id} not found!`);

  const upadtedPerson = { ...personToUpdate, ...personData };

  persons[foundPersonIndex] = upadtedPerson;

  return upadtedPerson;
};

const deletePerson = (id) => {
  const isValidID = uuid.validate(id);

  if (!isValidID) throw new BadRequestError('Invalid person ID!');

  let foundPersonIndex;

  const personToDelete = persons.find((person, i) => {
    if (person.id === id) {
      foundPersonIndex = i;
      return true;
    }
    return false;
  });

  if (!personToDelete) throw new NotFoundError(`Person with ID ${id} not found!`);

  persons.splice(foundPersonIndex, 1);
};

module.exports = {
  getPersons,
  getPersonByID,
  addPerson,
  updatePerson,
  deletePerson,
};
