const SECRET_TOKEN = "secret_" + parseInt(Math.random() * 1000);
var _instance = null;
// you can simulate static private properties with this trick
// just do not exports that variable outside the module

class SingletonExample {

    // if you prefer, you can create a static public property
    // static _instance = null;
    /*
    static getInstance() {
        if (SingletonExample._instance === null)
            SingletonExample._instance = new SingletonExample(SECRET_TOKEN);

        return SingletonExample._instance;
    }
    */

    /**
     * 
     * @returns SingletonExample unique instance
     */
    static getInstance() {
        if (_instance === null)
            _instance = new SingletonExample(SECRET_TOKEN);

        return _instance;
    }

    constructor(secretToken) {
        if (secretToken !== SECRET_TOKEN)
            throw (new Error("Don't call the new operator, use the static method 'getInstance' instead"));

        this.id = parseInt(Math.random() * 1000);
    }
}

module.exports = SingletonExample;