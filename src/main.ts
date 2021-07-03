import { Node } from "./Node";
import { User } from "./User";

const root:Node<User> = new Node<User>(0,10000, "age");
root.name = "root";


for( let i:number = 0; i < 1000000; i++ ){
    root.add( {id:1, name:"john doe", age: Math.ceil(Math.random() * 10000)} as User);
}

console.time("#age");
let i:number = 10; 
while( --i > -1){
    const results:User[] = root.search(4999,5000); 
}
console.timeEnd("#age");