export default class ServiceAlreadyExistsError extends Error {
    constructor(key) {
        super(`Service '${key}' already exists, please check your services config`);
    }
}