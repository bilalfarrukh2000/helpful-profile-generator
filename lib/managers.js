const Employee = require ("./employees.js");

class managers {
    constructor(name,id,email,officeNumber){
        super(name,id,email);
        this.officeNumber=officeNumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
    
    getRole(){
        return this.constructor.name;
    }
}

module.exports = managers