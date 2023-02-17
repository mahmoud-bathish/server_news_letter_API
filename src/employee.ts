import * as mongodb from 'mongodb'
export interface Employee {
    name : string;
    position:string;
    level: 'junior'|'Med'|'Senior'
    _id?:mongodb.ObjectId;
}

