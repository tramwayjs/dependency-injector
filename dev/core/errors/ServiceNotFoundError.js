export default class ServiceNotFoundError extends Error {
    constructor(service) {
        super(`'${service}' could not be found in services`);
    }
}