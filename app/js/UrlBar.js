/**
 * Created by jaro on 29.10.16.
 */


let instance = null;
module.exports = class UrlBar {
    static getInstance() {
        if (!instance) {
            instance = new urlBar();
        }
        return instance;
    }

    constructor() {

    }
};