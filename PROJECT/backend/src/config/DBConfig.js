import { createConnection } from "mysql2";

export function createConnectionObject(){
    const connectionObj = createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'project',
        
    });
    return connectionObj;
}

export function establishConnection(){
    createConnectionObject().connect((error)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Connected to the database");
        }
    });
}

