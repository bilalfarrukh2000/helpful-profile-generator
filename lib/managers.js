const Employees = require ("./Employees.js");

class Managers extends Employees {
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

module.exports = Managers;