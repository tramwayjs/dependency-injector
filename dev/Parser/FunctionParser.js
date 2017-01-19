/**
 * @class
 */
export default class FunctionParser {

    /**
     * Extracts the names of arguments from a function.
     *
     * @param {Function} func
     * @return {Array|{index: number, input: string}}
     */
    static parse(func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;

        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (result === null)
            result = [];

        return result;
    }
}