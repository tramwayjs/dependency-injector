/**
 * 
 * @export
 * @class DependencyNotFoundError
 * @extends {Error}
 */
export default class DependencyNotFoundError extends Error {
    /**
     * Creates an instance of DependencyNotFoundError.
     * 
     * @param {string} name
     * 
     * @memberOf DependencyNotFoundError
     */
    constructor(name) {
        super(`Cannot find module: ${name}`);
    }
}