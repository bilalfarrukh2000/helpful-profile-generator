const Employees = require ("./Employees.js");

class Interns extends Employees {
    constructor(name,id,email,school){
        super(name,id,email);
        this.school=school;
    }

    getSchool(){
        return this.school;
    }
    
    getRole(){
        return this.constructor.name;
    }
}

module.exports = Interns;