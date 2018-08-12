export default class ClassDoesNotExistError extends Error {
    constructor(service) {
        super(`'${service}' could does not have a valid class to instantiate`);
    }
}