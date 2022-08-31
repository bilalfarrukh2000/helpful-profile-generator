const Employees = require ("./Employees.js");

class Engineers extends Employees {
    constructor(name,id,email,github){
        super(name,id,email);
        this.github=github;
    }

    getGithub(){
        return this.github;
    }
    
    getRole(){
        return this.constructor.name;
    }
}

module.exports = Engineers;