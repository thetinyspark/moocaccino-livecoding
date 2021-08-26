const SingletonExample = require("./SingletonExample"); 

try{
    const obj = new SingletonExample();
}
catch( e ){
    console.log(e.message);
}
finally{
    // You can call the getInstance method multiple times it will
    // give you the same instance everytime
    console.log( SingletonExample.getInstance().id );
    console.log( SingletonExample.getInstance().id );
}